const express = require("express"); //引入express
const router = express.Router(); // 使用express Router
const userSev = require("../server/userSev");
const asyncHandler = require("../utils/asyncHandler");

// 添加用户
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const params = req.body || {};
    const user = await userSev.getUser(params);
    if (user) return "该名称已被注册"
    const result = await userSev.addUser(params);
    return result;
  })
);

// 根据id查询用户信息
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const result = await userSev.getUserById(userId);
    return result;
  })
);

// 修改用户信息
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await userSev.editUser(id, req.body);
    return result;
  })
);

// 用户登录
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const result = await userSev.login(req.body);
    return result;
  })
);
module.exports = router;
