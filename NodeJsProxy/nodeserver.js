/**
 * Created by robin on 2017/9/10.
 */
/**
 * Created by robin on 2017/9/8.
 */
var http = require('http');
var fs = require('fs');
var PORT=8080;
var app_add = http.createServer(function (req,resp){
    console.log('enter server');
    var path = __dirname + req.url;
    console.log(path);
    fs.readFile(path,function(err,data) {
        if(err) {
            console.log('invalid path');
            resp.writeHead(500,{'Content-Type':'text/html'});
            resp.end();
            return;
        }
        resp.writeHead(200,{'Content-Type':'text/html'});
        resp.write(data.toString());
        resp.end();
    })
});
app_add.listen(PORT,function(){
    console.log('server is running at %d',PORT);
});
