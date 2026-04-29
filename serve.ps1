param(
    [int]$Port = 5050,
    [string]$Root = "$PSScriptRoot"
)

$listener = New-Object System.Net.HttpListener
$url = "http://localhost:$Port/"
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host "Serving files from '$Root' on $url"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relativePath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath.TrimStart('/'))
        if ([string]::IsNullOrEmpty($relativePath)) {
            $relativePath = 'index.html'
        }

        $filePath = Join-Path $Root $relativePath
        if (-not (Test-Path $filePath -PathType Leaf)) {
            $response.StatusCode = 404
            $response.ContentType = 'text/plain'
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $relativePath")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
            continue
        }

        $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $contentType = switch ($extension) {
            '.html' { 'text/html' }
            '.htm' { 'text/html' }
            '.css' { 'text/css' }
            '.js' { 'application/javascript' }
            '.json' { 'application/json' }
            '.png' { 'image/png' }
            '.jpg' { 'image/jpeg' }
            '.jpeg' { 'image/jpeg' }
            '.gif' { 'image/gif' }
            '.svg' { 'image/svg+xml' }
            '.ico' { 'image/x-icon' }
            default { 'application/octet-stream' }
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.OutputStream.Close()
    }
}
catch {
    Write-Error $_.Exception.Message
}
finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        $listener.Close()
    }
}
