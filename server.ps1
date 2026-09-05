# GM Constructions Live Preview & Auto-Reload Server
$port = 8080
$root = $PSScriptRoot
if (-not $root) { $root = "D:\GM" }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  GM Constructions Live Preview Server Started!           " -ForegroundColor Green
    Write-Host "  URL: $prefix                                            " -ForegroundColor Yellow
    Write-Host "  Live Reload: ACTIVE (Auto-refreshes when files change)  " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Cyan
} catch {
    Write-Error "Failed to start listener on port $port : $_"
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

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath

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
