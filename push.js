const http2 = require('http2');
const fs = require('fs');

/* 
  Use 'https://api.push.apple.com' producao
  host = 'https://api.sandbox.push.apple.com' sandbox
*/


host = 'https://api.push.apple.com'
path = '/3/device/{device_token}'

/*
Usando certificados convertidos de uma chave p12
inseridos no mesmo diretório.
*/

const client = http2.connect(host, {
  key: fs.readFileSync(__dirname + '/newfile.key.pem'),
  cert: fs.readFileSync(__dirname + '/newfile.crt.pem')
});

client.on('error', (err) => console.error(err));

body = {
  "aps": {
    "alert": {
        "title": "Teste push iOS",
        "body": "Teste envio de push"
    },
    "content-available": 1
  }
}

headers = {
  ':method': 'POST',
  'apns-topic': '{com.xxxxxx.xxxxxxx}', //you application bundle ID
  ':scheme': 'https',
  ':path': path
}

const request = client.request(headers);

request.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

request.setEncoding('utf8');

let data = ''
request.on('data', (chunk) => { data += chunk; });
request.write(JSON.stringify(body))
request.on('end', () => {
console.log(`\n${data}`);
client.close();
});
request.end();