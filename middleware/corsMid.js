// 处理跨域的中间件
module.exports = (req, res, next) => {
  if (req.method.toLocaleLowerCase() === "options") {
    // 读取请求头中的相关信息
    const nextHead = req.headers['access-control-request-headers'];
    const nextMethod = req.headers['access-control-request-method'];
    nextHead && res.setHeader('Access-Control-Allow-Headers', nextHead);
    nextMethod && res.setHeader('Access-Control-Allow-Method', nextMethod);
  }
  // 简单请求
  // Origin字段无论简单请求还是复杂都需要配置
  // 从请求头中获取origin
  const nextOrigin = req.headers.origin;
  nextOrigin && res.setHeader('Access-Control-Allow-Origin', nextOrigin);
  next();
}