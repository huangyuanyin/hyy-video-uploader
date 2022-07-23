const express = require("express");
const bodyParser = require("body-parser");
const uploader = require("express-fileupload");

const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(uploader());

// 处理跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-origin", "*"); // 允许访问的源 所有
  res.header("Access-Control-Allow-origin", "POST,GET");
});

// 监听端口
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

// 接口
app.post("/upload_video", (req, res) => {
  res.send({
    msg: "OK",
    code: 0,
  });
});
