# Minimal static file server for local preview.
# Node and Python are not installed on this machine, so this stands in.
#
#   Run:   powershell -ExecutionPolicy Bypass -File .\dev-server.ps1
#   Open:  http://localhost:5599
#   Stop:  Ctrl+C in this window

$root = $PSScriptRoot
$prefix = 'http://localhost:5599/'

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.gif'  = 'image/gif'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.woff2' = 'font/woff2'
    '.woff' = 'font/woff'
    '.xml'  = 'application/xml'
    '.txt'  = 'text/plain'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "serving $root at $prefix"

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
    } catch {
        break
    }
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($rel -eq '/') { $rel = '/index.html' }
    $file = Join-Path $root ($rel.TrimStart('/').Replace('/', '\'))

    try {
        if (Test-Path -LiteralPath $file -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            $ext = [System.IO.Path]::GetExtension($file).ToLower()
            $ct = $mime[$ext]
            if (-not $ct) { $ct = 'application/octet-stream' }
            $ctx.Response.ContentType = $ct
            $ctx.Response.Headers.Add('Cache-Control', 'no-store')
            $ctx.Response.ContentLength64 = $bytes.Length
            $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $ctx.Response.StatusCode = 404
            $b = [Text.Encoding]::UTF8.GetBytes("404 - not found: $rel")
            $ctx.Response.ContentType = 'text/plain'
            $ctx.Response.OutputStream.Write($b, 0, $b.Length)
        }
    } catch {
        $ctx.Response.StatusCode = 500
    }
    $ctx.Response.Close()
}
