# Teste de envio de push via APNS com node.js

## Pré requisitos

jsonwebtoken v8.5.1 e node.js v13.7.0

## Usando Certificado (p12)

Enviaremos solicitações HTTPS / 2 para a apple. Use o comando abaixo para gerar o arquivo de chave / certificado. Substitua path.12 pelo caminho do arquivo p12 ou nome do arquivo (se estiver no mesmo diretório). Quando for solicitada a senha, digite a senha do seu arquivo p12.

`openssl pkcs12 -in path.p12 -out newfile.crt.pem -clcerts -nokeys`
`openssl pkcs12 -in path.p12 -out newfile.key.pem -nocerts -nodes`