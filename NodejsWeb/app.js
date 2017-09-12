/**
 * Created by robin on 2017/9/8.
 */
var http = require('http');

var PORT=8080;

var app = http.createServer(function (req,resp){
    resp.writeHead(200,{'Content-Type':'text/html'});
    resp.write('<h1>hello</h1>');
    resp.end();
});
app.listen(PORT,function(){
    console.log('server is running at %d',PORT);
})

