$json = Get-Content "$env:USERPROFILE\Downloads\my-learning-f8530-firebase-adminsdk-*.json" | ConvertFrom-Json
$escapedKey = $json.private_key.Replace([Environment]::NewLine, "\n")

$lines = @(
    "FIREBASE_ADMIN_PROJECT_ID=$($json.project_id)",
    "FIREBASE_ADMIN_CLIENT_EMAIL=$($json.client_email)",
    "FIREBASE_ADMIN_PRIVATE_KEY="$escapedKey""
)

$lines | Out-File -Append -FilePath ".env.local" -Encoding utf8

Write-Output "Done! Check .env.local"