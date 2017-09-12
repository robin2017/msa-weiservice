/**
 * Created by robin on 2017/9/8.
 */
var http = require('http');
var fs = require('fs');

var PORT=1234;

var app_add = http.createServer(function (req,resp){
    console.log('enter server');
    var path = __dirname + req.url;
    console.log(path);
    fs.readFile(path,function(err,data) {
        if(err) {
            console.log('invalid path');
            fs.readFile(__dirname+'/app_add/error.html', function (err,data1) {
                console.log('print 404 page');
                resp.writeHead(200,{'Content-Type':'text/html'});
                resp.write(data1.toString());
                resp.end();
            });
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

