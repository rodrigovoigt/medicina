$filePath = "d:\Meus arquivos\Projetos\Projeto Medicina do Github\medicina\docs\qual-especialidade\dados-especialidades.json"
$content = Get-Content $filePath -Raw

# Corrigir IDs corrompidos
$content = $content -replace '\s*\'"id": \'\s*\+\s*\(\$id\+\+\)\s*\+\s*\',\'', '"id": PLACEHOLDER,'

# Substituir PLACEHOLDERs com IDs sequenciais
$id = 5
$content = $content -replace '"id": PLACEHOLDER,', { '"id": ' + ($id++) + ',' }

# Salvar arquivo
$content | Set-Content $filePath

Write-Host "IDs corrigidos com sucesso!"
