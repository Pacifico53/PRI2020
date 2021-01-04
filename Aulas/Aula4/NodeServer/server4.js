var http = require('http');
//TODO PROBABLY SOMETHING WRONG HERE
var url = require('url');
const { receiveMessageOnPort } = require('worker_threads');

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'})
    var q = url.parse(req.url, true).query;
    res.write('True: <pre>' + JSON.stringify(q) + '</pre>');

    var qtext = url.parse(req.url, false).query;
    res.write('False: <pre>'+JSON.stringify(qtext) + '</pre>');

    var parsed = url.parse(req.url, true);
    res.end('URL parsed: <pre>'+ JSON.stringify(parsed)+ '</pre>')
}).listen(7777);