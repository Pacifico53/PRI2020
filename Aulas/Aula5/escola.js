const http = require('http');
const axios = require('axios');

var servidor = http.createServer(function (req, res){
    console.log(req.method + ' ' + req.url);

    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>');
            res.write('<li><a href=\"http://localhost:3001/alunos\">Lista de alunos</a></li>')
            res.write('</ul>');
            res.end();
        }
        else if(req.url == '/alunos'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos')
                .then((resp) => {
                    alunos = resp.data;
                    res.write('<ul>');
                    alunos.forEach(a => {
                        res.write(`<li>${a.id}, ${a.nome}, ${a.instrumento}</li>`); //TODO
                        console.log(`${a.id}, ${a.nome}, ${a.instrumento}`);
                    });
                    res.write('</ul>');
                    res.end();
                }).catch((err) => {
                    console.log('Erro :'+err);
                    res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                    res.end();
                });
        }
    }

    else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
        res.end();
    }
})
servidor.listen(3001);
console.log('Listening 3001');