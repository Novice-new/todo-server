module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.send({
      msg: "错误请求",
      code: err.statusCode || 403,
      data: null,
    });
  }
  next();
};
