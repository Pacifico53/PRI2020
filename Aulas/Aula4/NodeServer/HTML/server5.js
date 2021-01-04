//TODO IDK SOMETHING WRONG
var http = require('http');
var fs = require('fs');

var servidor = http.createServer(function (req, res){
    if (req.url.match(/\/[1-3]$/)) {
        var num = req.url.split('/')[1];
        fs.readFile('pag' + num + '.html', function(err, data){
            if(err){
                console.log('Erro na leiturad o file: ' + err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>File inexistente.</p>")
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                res.end()
            }
        })
    }
    else{
        console.log('Erro: foi pedido um file nao esperado!'); // TODO FIX FAVICON ERR
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>File inexistente.</p>")
        res.end()
        
    }

})

servidor.listen(7777);
console.log('Listening...');