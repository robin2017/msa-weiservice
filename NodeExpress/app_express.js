/**
 * Created by robin on 2017/9/9.
 */

var express = require('express');//引入express模块

var PORT = 1234;

var app = express();//创建app

app.use(express.static('.'));
app.listen(PORT,function(){
    console.log("server is running");
})

app.listen(3000);//绑定监听的端口
console.log('Express started on port 3000');//输出监听信息


