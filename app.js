var createError = require("http-errors");
var express = require("express");
var path = require("path");
var http = require("http");

var indexRouter = require("./routes/index");

var app = express();
// 接收post请求
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
// 页面路由
app.use("/", indexRouter);
// 后端接口
app.use("/", require("./route/query")); // 服务端接口

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

var port = "3000";
app.set("port", port);

var server = http.createServer(app);

server.listen(port, () => console.log(`系统已启动，访问地址为: http://localhost:3000`));
