# Verification script for ShopCart REST APIs
$ErrorActionPreference = 'Stop'
$baseUrl = "http://localhost:8080/api"

Write-Host "================================================="
Write-Host " Running ShopCart Full End-to-End API Test Suite "
Write-Host "================================================="

# 1. Test Products API
Write-Host "`n1. Testing GET /api/products..."
$prods = Invoke-RestMethod -Uri "$baseUrl/products"
Write-Host "  -> Success: $($prods.success), Total Products: $($prods.data.Count)"

# 2. Test Category API
Write-Host "`n2. Testing GET /api/categories..."
$cats = Invoke-RestMethod -Uri "$baseUrl/categories"
Write-Host "  -> Success: $($cats.success), Categories: $($cats.data.Count)"

# 3. Test Customer Authentication
Write-Host "`n3. Testing POST /api/auth/login (Customer)..."
$loginPayload = @{ email = "user@shopcart.com"; password = "user123" } | ConvertTo-Json
$auth = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginPayload -ContentType "application/json"
$userId = $auth.data.id
$token = $auth.data.token
Write-Host "  -> Logged in user: $($auth.data.fullName) [ID: $userId, Role: $($auth.data.role)]"

$headers = @{
    "X-User-Id" = "$userId"
    "Authorization" = "Bearer $token"
}

# 4. Test Add to Cart
Write-Host "`n4. Testing POST /api/cart/add (Product ID 1 - HP Pavilion 15)..."
$cartAddPayload = @{ productId = 1; quantity = 1 } | ConvertTo-Json
$cart = Invoke-RestMethod -Uri "$baseUrl/cart/add" -Method Post -Body $cartAddPayload -ContentType "application/json" -Headers $headers
Write-Host "  -> Cart Items: $($cart.data.totalItems), Subtotal: ₹$($cart.data.subtotal)"

# 5. Test Apply Coupon (SAVE20)
Write-Host "`n5. Testing POST /api/coupons/apply (Code: SAVE20)..."
$couponPayload = @{ code = "SAVE20"; orderAmount = $cart.data.subtotal } | ConvertTo-Json
$coupon = Invoke-RestMethod -Uri "$baseUrl/coupons/apply" -Method Post -Body $couponPayload -ContentType "application/json"
Write-Host "  -> Valid: $($coupon.data.valid), Discount: ₹$($coupon.data.calculatedDiscount), Final: ₹$($coupon.data.finalTotal)"

# 6. Test Wishlist Toggle
Write-Host "`n6. Testing POST /api/wishlist/toggle/3 (MacBook Air)..."
$wish = Invoke-RestMethod -Uri "$baseUrl/wishlist/toggle/3" -Method Post -Headers $headers
Write-Host "  -> Wishlist Message: $($wish.message)"

# 7. Test Place Order & Checkout
Write-Host "`n7. Testing POST /api/orders (Checkout with Mock UPI Payment)..."
$checkoutPayload = @{
    shippingAddress = @{
        fullName = "Rahul Sharma"
        phone = "+91 91234 56789"
        streetAddress = "Flat 402, Sunshine Apts, Indiranagar"
        city = "Bangalore"
        state = "Karnataka"
        pinCode = "560038"
        country = "India"
    }
    paymentMethod = "UPI"
    upiId = "rahul@okhdfcbank"
    couponCode = "SAVE20"
} | ConvertTo-Json -Depth 5

$order = Invoke-RestMethod -Uri "$baseUrl/orders" -Method Post -Body $checkoutPayload -ContentType "application/json" -Headers $headers
$newOrderNumber = $order.data.orderNumber
Write-Host "  -> Order Created: #$newOrderNumber, Status: $($order.data.status), Grand Total: ₹$($order.data.grandTotal)"

# 8. Test Live Order Tracking
Write-Host "`n8. Testing GET /api/orders/track/$newOrderNumber..."
$tracked = Invoke-RestMethod -Uri "$baseUrl/orders/track/$newOrderNumber"
Write-Host "  -> Track Status: $($tracked.data.status), Transaction ID: $($tracked.data.transactionId)"

# 9. Test Product Review Submission
Write-Host "`n9. Testing POST /api/reviews..."
$reviewPayload = @{
    productId = 1
    rating = 5
    title = "Excellent laptop for coding!"
    comment = "Lightning fast compilation and sleek design."
} | ConvertTo-Json
$review = Invoke-RestMethod -Uri "$baseUrl/reviews" -Method Post -Body $reviewPayload -ContentType "application/json" -Headers $headers
Write-Host "  -> Review submitted by: $($review.data.userName) with $($review.data.rating) Stars"

# 10. Test Admin Dashboard Stats & Status Progression
Write-Host "`n10. Testing Admin Stats & Order Status Update..."
$adminStats = Invoke-RestMethod -Uri "$baseUrl/admin/stats"
Write-Host "  -> Admin Total Revenue: ₹$($adminStats.data.totalRevenue), Orders: $($adminStats.data.totalOrders)"

$orderId = $order.data.id
$updateStatus = Invoke-RestMethod -Uri "$baseUrl/admin/orders/$orderId/status?status=CONFIRMED" -Method Put
Write-Host "  -> Advanced Order #$newOrderNumber Status to: $($updateStatus.data.status)"

Write-Host "`n================================================="
Write-Host " ALL 10 TEST SUITE FLOWS PASSED SUCCESSFULLY! 🚀 "
Write-Host "================================================="
