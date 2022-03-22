const User = require("../db/User");
// 添加用户
exports.addUser = async function (userData) {
  const user = User.create(userData);
  return user;
};

// 修改用户信息
exports.editUser = async function (id, data) {
  const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true });
  return user;
};

// 获取用户信息
exports.getUserById = async function (id) {
  const user = await User.findById(id);
  return user;
};

// 登录
exports.login = async function (userData) {
  const user = await User.findOne(userData);
  return user;
};
