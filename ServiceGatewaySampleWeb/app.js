var express = require("express");
var zookeeper = require("node-zookeeper-client");
var fs = require('fs');
var PORT = 1234;
var CONNECTION_STRING = '127.0.0.1:2181';
var REGISTRY_ROOT = '/registry';
//连接zk
var zk = zookeeper.createClient(CONNECTION_STRING);
zk.connect();
//启动WEB服务器
var app = express();
app.use(express.static('public'));
app.all('*', function (req, res) {
    if (req.path == '/favicon.ico') {
        res.end();
        return;
    }
    //获取服务名称
    var serviceName = req.get('Service-Name');
    console.log('serviceName : %s', serviceName);

    if (!serviceName) {
        console.log('service-name request header is not exist');
        var path = __dirname + req.url;
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log('invalid path');
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
            res.end();
        });
        return
    } else {
        res.write(serviceName);
        res.end();
    }
    //获取路径名称
    var servicePath = REGISTRY_ROOT + '/' + serviceName;
    console.log('servicePath :%s', servicePath)
    //获取路径下的地址节点
    zk.getChildren(servicePath, function (err, addressNodes) {
        if (err) {
            console.log(err.stack);
            res.end();
            return;
        }
        var size = addressNodes.length;
        if (size == 0) {
            console.log('address node is not exist');
            res.end();
            return;
        }
        //生成路径地址
        var addressPath = servicePath + '/';
        if (size == 1) {
            //只有一个地址
            addressPath += addressNodes[0];
        } else {
            //存在多个地址,随机获取一个地址
            addressPath += addressNodes[parseInt(Math.random() * size)];
        }
        console.log('addressPath : %s',addressPath);
        //获取服务地址
        zk.getData(addressPath, function (err, serviceAddress) {
            if (err) {
                console.log(err.stack);
                res.end();
                return;
            }
            console.log('serviceAddress : %s',serviceAddress);
            if (!serviceAddress) {
                console.log('service address is not exist');
                res.end();
                return;
            }
        });
    });
});
app.listen(PORT, function () {
    console.log('server is running at %d', PORT);
});
