//criar e descodificar um token
var jwt = require('jsonwebtoken');

try {
    var token = jwt.sign({ username: 'jcr', level: 'admin', expiresIn: '1d' }, 'PRI2020');
    console.log('Token: ' + token);
}
catch (e) {
    console.log('Erro na criaçao do token: ' + e);
}

try{
    var decoded = jwt.verify(token, 'segredo errado');
    console.log(JSON.stringify(decoded));
}
catch(err){
    console.log('Erro: ' + err);
}

jwt.verify(token, 'PRI2020', function(err, payload){
    if(err) console.log('Erro na verificaçao do token: ' + err);
    else console.log(JSON.stringify(payload));
})
