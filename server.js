const PORT = 8888; //访问端口号8888   //端口号最好为6000以上
var http = require('http'); //引入http模块
var fs = require('fs'); //引入fs模块
var url = require('url');//引入url模块
var path = require('path');//引入path模块

var cp = require('child_process');  // 可自动打开浏览器模块
var chalk = require('chalk');   //命令行输出字体颜色

// req : 从浏览器带来的请求信息
// res : 从服务器返回给浏览器的信息
var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;;
     //客户端输入的url，例如如果输入localhost:8888/index.html，那么这里的url == /index.html 
     //url.parse()方法将一个URL字符串转换成对象并返回，通过pathname来访问此url的地址。
    // var realPath = path.join('F:/nodejs/nodetest',pathname);
    var realPath = path.join(__dirname, pathname);
    //完整的url路径
    console.log(realPath);  
    // F:/nodejs/nodetest/index.html

    fs.readFile(realPath,function(err,data){
        /*
        realPath为文件路径
        第二个参数为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
        */
        if(err){
            //未找到文件
            // res.writeHead(404,{
            //     'content-type':'text/plain'
            // });
            // res.write('404,页面不在');
            // res.end();
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }else{
            //成功读取文件
            // res.writeHead(200,{
            //     // 'content-type':'text/html;charset=utf-8'
            // });
            rsFn(res, pathname)
            res.write(data);
            res.end();
        }
    })
});
server.listen(PORT); //监听端口
// console.log('服务成功开启')
console.log(chalk.green('服务成功开启'))
console.log(chalk.blue(`Server running at http://127.0.0.1:${PORT} || http://localhost:${PORT}`))
// cp.exec(`start http://127.0.0.1:${PORT}`);  // 自动打开默认浏览器
cp.exec(`start http://127.0.0.1:${PORT}/dist/index.html`);  // 自动打开默认浏览器


var rsFn = function(res, pathname) {
        switch(path.extname(pathname)){ // 不同文件返回不同类型
            case ".html":
                res.writeHead(200, {"Content-Type": "text/html"});
                break;
            case ".js":
                res.writeHead(200, {"Content-Type": "text/javascript"});
                break;
            case ".css":
                res.writeHead(200, {"Content-Type": "text/css"});
                break;
            case ".gif":
                res.writeHead(200, {"Content-Type": "image/gif"});
                break;
            case ".jpg":
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                break;
            case ".png":
                res.writeHead(200, {"Content-Type": "image/png"});
                break;
            default:
                res.writeHead(200, {"Content-Type": "application/octet-stream"});
        }        
}
