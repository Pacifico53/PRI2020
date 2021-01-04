//criar e descodificar um token com chaves rsa
var fs = require('fs');
var jwt = require('jsonwebtoken');
var myToken = "";

var privateKey = fs.readFileSync('mykey.pem');

jwt.sign({ username: 'jcr', level: 'admin', sub: 'aula de PRI2020' }, privateKey, { algorithm: 'RS256' }, function (err, token) {
    if (err) console.log('Erro: ' + err);
    else {
        console.log('Token: ' + token + '\n\n');
        myToken = token
    }
});

fs.readFile('pubkey.pem', function (err, publicKey) {
    jwt.verify(myToken, publicKey, { algorithms: ['RS256'] }, function (err, decoded) {
        if (err) console.log('Erro: ' + err);
        else console.log('DATA: ' + JSON.stringify(decoded));
    });
})

