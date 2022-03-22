// 打印请求时间，请求方法，请求地址
module.exports = function (req, res, next) {
  const time = Date.now();
  console.log(`${time} -- ${req.method} -- ${req.url}`);
  next();
};
