const express = require("express");
const createError = require("http-errors");
const { port } = require("../config/base");
const app = express();

// 处理请求参数中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 跨域中间件
app.use(require("../middleware/corsMid"))

// 自定义的打印中间件
app.use(require("../middleware/logMid"));

// user
app.use("/api/todo", require("./todo"));

// todo
app.use("/api/user", require("./user"));

// 处理错误中间件
app.use(require("../middleware/errorMid"));

app.listen(port, () => {
  console.log(`server listen ${port}`);
});
