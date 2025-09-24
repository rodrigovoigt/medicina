# PWA Icon Generator Script
# Este script ajuda a gerar ícones PWA em diferentes tamanhos

Write-Host "=== DocGO! PWA Icon Generator ===" -ForegroundColor Green

$iconSizes = @(
    @{ Size = "72x72"; Name = "icon-72x72.png" },
    @{ Size = "96x96"; Name = "icon-96x96.png" },
    @{ Size = "128x128"; Name = "icon-128x128.png" },
    @{ Size = "144x144"; Name = "icon-144x144.png" },
    @{ Size = "152x152"; Name = "icon-152x152.png" },
    @{ Size = "192x192"; Name = "icon-192x192.png" },
    @{ Size = "384x384"; Name = "icon-384x384.png" },
    @{ Size = "512x512"; Name = "icon-512x512.png" }
)

$currentDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$assetsDir = Join-Path $currentDir "assets\img"

Write-Host "`nDiretório de ícones: $assetsDir" -ForegroundColor Cyan

# Verifica se existe o ícone base
$baseIcon = Join-Path $assetsDir "icon.png"
if (Test-Path $baseIcon) {
    Write-Host "✅ Ícone base encontrado: icon.png" -ForegroundColor Green
} else {
    Write-Host "❌ Ícone base não encontrado!" -ForegroundColor Red
    Write-Host "Coloque um arquivo 'icon.png' em: $assetsDir" -ForegroundColor Yellow
    return
}

Write-Host "`n📱 Para otimizar completamente seu PWA, você precisará:" -ForegroundColor Yellow
Write-Host "1. Gerar ícones em diferentes tamanhos"
Write-Host "2. Otimizar as imagens"
Write-Host "3. Testar o PWA em diferentes dispositivos"

Write-Host "`n🔧 Tamanhos de ícones recomendados:" -ForegroundColor Cyan
foreach ($icon in $iconSizes) {
    Write-Host "  - $($icon.Size) -> $($icon.Name)" -ForegroundColor Gray
}

Write-Host "`n🌐 Para testar o PWA:" -ForegroundColor Green
Write-Host "1. Hospede o site em um servidor HTTPS"
Write-Host "2. Abra no Chrome e vá em DevTools > Application > Manifest"
Write-Host "3. Teste a instalação clicando no botão '📱 Instalar App'"
Write-Host "4. Verifique o Service Worker na aba Application > Service Workers"

Write-Host "`n✨ Recursos PWA implementados:" -ForegroundColor Magenta
Write-Host "✅ Web App Manifest (manifest.json)"
Write-Host "✅ Service Worker com cache inteligente"
Write-Host "✅ Detecção offline/online"
Write-Host "✅ Botão de instalação"
Write-Host "✅ Notificações de atualização"
Write-Host "✅ Preload de recursos críticos"
Write-Host "✅ Shortcuts para calculadoras principais"

Write-Host "`n🚀 Seu PWA DocGO! está pronto!" -ForegroundColor Green