/**
 * Created by robin on 2017/9/11.
 */

var zookeeper = require('node-zookeeper-client');
var CONNECTION_STRING = 'localhost:2181';
var OPTIONS = {
    sessionTimeout : 5000
};
var zk = zookeeper.createClient(CONNECTION_STRING,OPTIONS);
zk.on('connected',function(){
    console.log(zk);
    zk.close();
});
zk.connect();

//1、列出子节点
zk.getChildren('/',function(err,children,stat){
    if (err) {
        console.log(error.stack);
        return;
    }
    console.log("1、列出子节点");
    console.log(children)
});

//2、判断节点是否存在
zk.exists('/foo', function (err,stat) {
    if (stat) {
        console.log('node exists')
    } else {
        console.log('node does not exists')
    }
});

//3、创建节点
zk.create('/foo',new Buffer('hello'),function (err,path) {
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log('3、创建节点')
    console.log(path)
});

//4、获取节点数据
zk.getData('/foo', function (err,data,stat) {
    if (err) {
        console.log(error.stack);
        return;
    }
    console.log('4、获取节点数据');
    console.log(data.toString())
});

//5、更新节点数据
zk.setData('/foo',new Buffer('hi'),function (err,stat) {
    if (err) {
        console.log(error.stack);
        return;
    }
    console.log('5、更新节点数据');
    console.log(stat)
});

//6、删除节点
zk.remove('/foo',function (err){
    if (!err) {
        console.log('node is deleted')
    } else {
        console.log('node delete failure')
    }
})