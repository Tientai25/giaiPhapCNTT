# Test API với PowerShell

## 1. Test Health Check
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method Get
Write-Host "Health Check: $($response.status)" -ForegroundColor Green

## 2. Test Register (Đăng ký user mới)
$registerData = @{
    full_name = "Nguyễn Văn Test"
    email = "test@tdt.edu.vn"
    password = "123456"
    phone = "0909123456"
    company = "TDT University"
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body $registerData -ContentType "application/json"
Write-Host "`nRegister Response:" -ForegroundColor Yellow
$registerResponse | ConvertTo-Json

## Lưu token
$token = $registerResponse.data.token
Write-Host "`nToken saved: $token" -ForegroundColor Cyan

## 3. Test Login (Đăng nhập)
$loginData = @{
    email = "test@tdt.edu.vn"
    password = "123456"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Body $loginData -ContentType "application/json"
Write-Host "`nLogin Response:" -ForegroundColor Yellow
$loginResponse | ConvertTo-Json

## 4. Test Get Profile (với token)
$headers = @{
    Authorization = "Bearer $($loginResponse.data.token)"
}

$profileResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/profile" -Method Get -Headers $headers
Write-Host "`nProfile Response:" -ForegroundColor Yellow
$profileResponse | ConvertTo-Json

Write-Host "`n✅ All tests completed!" -ForegroundColor Green
