# Simple PowerShell HTTP Server
$port = 8080
$url = "http://localhost:$port/"

Write-Host "Starting local server at $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "Server running! Open your browser to: $url" -ForegroundColor Cyan

try {
    while ($listener.IsListening) {
        # Wait for a request
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Get the requested file path
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        # Remove leading slash and get full file path
        $filePath = Join-Path (Get-Location) ($path.TrimStart('/'))
        
        Write-Host "Request: $($request.HttpMethod) $path" -ForegroundColor Gray
        
        if (Test-Path $filePath -PathType Leaf) {
            # File exists, serve it
            $content = Get-Content $filePath -Raw -Encoding UTF8
            
            # Set content type based on file extension
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".xml"  { $response.ContentType = "application/xml; charset=utf-8" }
                ".txt"  { $response.ContentType = "text/plain; charset=utf-8" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentLength64 = $buffer.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            # File not found
            $response.StatusCode = 404
            $errorContent = "<h1>404 - File Not Found</h1><p>The requested file '$path' was not found.</p>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorContent)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    }
} catch {
    Write-Host "Server stopped: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Yellow
}