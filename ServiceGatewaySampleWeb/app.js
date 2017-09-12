var express = require("express");
var fs = require('fs');
var PORT = 1234;
var app = express();
app.use(express.static('public'));
app.all('*', function (req, res) {
    if (req.path == '/favicon.ico') {
        res.end();
        return;
    }
    var serviceName = req.get('Service-Name');
    console.log('serviceName : %s', serviceName);

    if (!serviceName) {
        console.log('service-name request header is not exist');
        var path = __dirname + req.url;
        fs.readFile(path,function(err,data) {
            if(err) {
                console.log('invalid path');
                res.end();
                return;
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data.toString());
            res.end();
        });
    } else {
        res.write(serviceName);
        res.end();
    }
});
app.listen(PORT, function () {
    console.log('server is running at %d', PORT);
});
