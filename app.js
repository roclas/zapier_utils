// Load the http module to create an http server.
var http = require('http');
var port = 9005;

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  console.log("request=",request.method,request.url);
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(request.url);
});

server.listen(port);
console.log("Server running at http://127.0.0.1:"+port+"/");
