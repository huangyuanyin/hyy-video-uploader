const express = require("express");
const bodyParser = require("body-parser");
const uploader = require("express-fileupload");
const { extname, resolve } = require("path");
const { existsSync, appendFileSync, writeFileSync } = require("fs");

const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(uploader());
app.use("/", express.static("upload_temp"));

// 处理跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-origin", "*"); // 允许访问的源 所有
  res.header("Access-Control-Allow-Methods", "POST,GET");
  next();
});

// 监听端口
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

const ALLOWED_TYPE = {
  "video/mp4": "mp4",
  "video/ogg": "ogg",
};

// 接口
app.post("/upload_video", (req, res) => {
  console.log("接口返回...", req.body);
  const { type, name, size, fileName, uploadedSize } = req.body;
  const { file } = req.files;
  if (!file) {
    res.send({
      msg: "No file uploaded",
      code: 1001,
    });
    return;
  }
  if (!ALLOWED_TYPE[type]) {
    res.send({
      msg: "The type is not allowed for uploading",
      code: 1002,
    });
    return;
  }
  const filename = fileName + extname(name);
  const filepath = resolve(__dirname, "./upload_temp/" + filename);
  if (uploadedSize !== "0") {
    // 文件不存在
    if (!existsSync(filepath)) {
      res.send({
        msg: "No file exists",
        code: 1003,
      });
      return;
    }
    // 文件存在
    appendFileSync(filepath, file.data);
    res.send({
      msg: "Appended",
      code: 0,
      video_url: "http://localhost:8000/" + filename,
    });
    return;
  }
  writeFileSync(filepath, file.data); // 创建一个文件,并写入文件
  res.send({
    msg: "File is created",
    code: 0,
  });
});
