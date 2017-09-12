
var http = require('http');
var httpProxy = require('http-proxy');
var PORT = 1235;
var proxy = httpProxy.createProxyServer();
proxy.on('error', function (err,req,resp) {
    resp.write(" proxy handel error");
    resp.end();
});

var app = http.createServer(function(req,resp){
    proxy.web(req,resp,{
        target:'http://localhost:8080'
    });
});
app.listen(PORT, function () {
   console.log("server is running")
});



