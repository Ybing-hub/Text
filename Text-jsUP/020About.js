var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

const server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Dreamz\n');
});

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});