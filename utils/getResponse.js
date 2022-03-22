module.exports = function ({ data = null, msg = "" }) {
  return {
    data,
    msg,
    code: 200,
  };
};
