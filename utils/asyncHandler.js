const getResponse = require("./getResponse");
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(getResponse({ data: result, msg: "success" }));
    } catch (error) {
      next(error);
    }
  };
};
