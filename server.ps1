# GM Constructions Live Preview & Auto-Reload Server
$port = 8080
$bindHost = if ($env:GM_BIND_HOST) { $env:GM_BIND_HOST } else { "+" }
$root = $PSScriptRoot
if (-not $root) { $root = "D:\GM" }
$dataFile = Join-Path $root "private-data.json"
$adminId = if ($env:GM_ADMIN_ID) { $env:GM_ADMIN_ID } else { "admin" }
$adminPassword = $env:GM_ADMIN_PASSWORD
$sessions = @{}

if (-not (Test-Path $dataFile)) {
    '{"visits":0,"enquiries":[]}' | Set-Content -Path $dataFile -Encoding UTF8
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://${bindHost}:$port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  GM Constructions Live Preview Server Started!           " -ForegroundColor Green
    Write-Host "  URL: $prefix                                            " -ForegroundColor Yellow
    $lanAddress = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
        Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
        Select-Object -First 1 -ExpandProperty IPAddress)
    if ($lanAddress) {
        Write-Host "  Phone URL: http://${lanAddress}:$port/                  " -ForegroundColor Yellow
        Write-Host "  Admin URL: http://${lanAddress}:$port/admin.html       " -ForegroundColor Yellow
    }
    Write-Host "  Live Reload: ACTIVE (Auto-refreshes when files change)  " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Cyan
} catch {
    Write-Error "Failed to start listener on port $port. Run PowerShell as Administrator once and execute: netsh http add urlacl url=http://+:$port/ user=Everyone. Details: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff2"= "font/woff2"
    ".woff" = "font/woff"
    ".ttf"  = "font/ttf"
}

# Live reload client script injected automatically into HTML pages
$liveReloadScript = @"
<script id="__live_preview_watcher">
(function() {
  let currentVersion = null;
  function checkReload() {
    fetch('/__live_version?_=' + Date.now())
      .then(r => r.json())
      .then(data => {
        if (currentVersion !== null && data.version > currentVersion) {
          console.log('[Live Preview] File update detected! Reloading page...');
          window.location.reload();
        } else {
          currentVersion = data.version;
        }
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(checkReload, 800);
      });
  }
  checkReload();
})();
</script>
</body>
"@

function Get-LatestFileTimestamp {
    $files = Get-ChildItem -Path $root -Include *.html,*.css,*.js,*.json,*.md -Recurse -File -ErrorAction SilentlyContinue
    if (-not $files) { return 0 }
    $latest = ($files | Measure-Object -Property LastWriteTimeUtc -Maximum).Maximum
    if ($latest) {
        return [int64]($latest.Subtract([datetime]'1970-01-01')).TotalMilliseconds
    }
    return 0
}

function Send-JsonResponse($response, $statusCode, $payload) {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes(($payload | ConvertTo-Json -Depth 6 -Compress))
    $response.ContentType = "application/json; charset=utf-8"
    $response.ContentLength64 = $bytes.Length
    $response.StatusCode = $statusCode
    $response.AddHeader("Access-Control-Allow-Origin", "*")
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.Close()
}

function Read-RequestJson($request) {
    $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
    try { return ($reader.ReadToEnd() | ConvertFrom-Json) } finally { $reader.Dispose() }
}

function Get-Data {
    return (Get-Content -Raw -Path $dataFile | ConvertFrom-Json)
}

function Save-Data($data) {
    $data | ConvertTo-Json -Depth 6 | Set-Content -Path $dataFile -Encoding UTF8
}

function New-SessionToken {
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    return ([Convert]::ToBase64String($bytes) -replace '[^A-Za-z0-9]', '')
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath

        if ($request.HttpMethod -eq "OPTIONS" -and $urlPath.StartsWith("/api/")) {
            $response.StatusCode = 204
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Token")
            $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            $response.Close()
            continue
        }

        if ($urlPath -eq "/api/visit" -and $request.HttpMethod -eq "POST") {
            $data = Get-Data
            $data.visits = [int]$data.visits + 1
            Save-Data $data
            Send-JsonResponse $response 200 @{ success = $true }
            continue
        }

        if ($urlPath -eq "/api/enquiry" -and $request.HttpMethod -eq "POST") {
            $body = Read-RequestJson $request
            $data = Get-Data
            $data.enquiries += [PSCustomObject]@{
                date = (Get-Date).ToUniversalTime().ToString("o")
                name = [string]$body.name
                phone = [string]$body.phone
                email = [string]$body.email
                projectType = [string]$body.projectType
                location = [string]$body.location
                message = [string]$body.message
            }
            Save-Data $data
            Send-JsonResponse $response 201 @{ success = $true }
            continue
        }

        if ($urlPath -eq "/api/admin/login" -and $request.HttpMethod -eq "POST") {
            if ([string]::IsNullOrWhiteSpace($adminPassword)) {
                Send-JsonResponse $response 503 @{ error = "GM_ADMIN_PASSWORD is not configured on the server." }
                continue
            }
            $body = Read-RequestJson $request
            if ([string]$body.id -ne $adminId -or [string]$body.password -ne $adminPassword) {
                Send-JsonResponse $response 401 @{ error = "Invalid admin credentials." }
                continue
            }
            $token = New-SessionToken
            $sessions[$token] = (Get-Date).AddHours(8)
            Send-JsonResponse $response 200 @{ token = $token }
            continue
        }

        if ($urlPath -eq "/api/admin/stats" -and $request.HttpMethod -eq "GET") {
            $token = $request.Headers["X-Admin-Token"]
            if (-not $sessions.ContainsKey($token) -or $sessions[$token] -lt (Get-Date)) {
                Send-JsonResponse $response 401 @{ error = "Unauthorized." }
                continue
            }
            $data = Get-Data
            Send-JsonResponse $response 200 @{ visits = [int]$data.visits; interested = @($data.enquiries).Count; enquiries = @($data.enquiries) }
            continue
        }

        # Handle Live Preview Version Endpoint
        if ($urlPath -eq "/__live_version") {
            $ver = Get-LatestFileTimestamp
            $json = "{`"version`": $ver}"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "/index.html"
        }

        # Safe Path Resolution
        $relPath = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $relPath))

        if (-not $filePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            
            # Disable caching for instant live edits
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.AddHeader("Pragma", "no-cache")
            $response.AddHeader("Expires", "0")

            if ($ext -eq ".html" -or $ext -eq ".htm") {
                $htmlText = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
                # Inject the auto-reload watcher script before </body>
                if ($htmlText -match '(?i)</body>') {
                    $htmlText = $htmlText -replace '(?i)</body>', $liveReloadScript
                } else {
                    $htmlText = $htmlText + $liveReloadScript
                }
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($htmlText)
            } else {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
            }

            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.Close()
    } catch {
        # Catch and continue on client stream reset
    }
}
