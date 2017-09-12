/**
 * Created by robin on 2017/9/9.
 */

var http = require('http');
var cluster = require('cluster');
var os = require('os');

var PORT = 1234;
var CPUS = os.cpus().length;

if (cluster.isMaster) {
    console.log("is master");
    for (var i = 0; i < CPUS; i++) {
        cluster.fork();
    }
} else {
    console.log('is not master');
    var app = http.createServer(function (req, resp) {
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write('hello.robin,cluster');
        resp.end();
    });
    app.listen(PORT, function () {
        console.log('server is running')
    })
};
