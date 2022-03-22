const express = require("express"); //引入express
const router = express.Router(); // 使用express Router
const todoSev = require("../server/todoSev");
const asyncHandler = require("../utils/asyncHandler");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const params = req.body || {};
    const result = await todoSev.addTodo(params);
    return result;
  })
);

router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const result = await todoSev.getTodoList(req.query);
    return result;
  })
);

router.post(
  "/edit/:id",
  asyncHandler(async (req, res, next) => {
    const result = await todoSev.editTodo(req.params.id, req.body);
    return result;
  })
);

router.get(
  "/month/list",
  asyncHandler(async (req, res) => {
    const result = await todoSev.getMonthTodo(req.query);
    return result;
  })
)

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const todoId = req.params.id;
    return await todoSev.getTodoDetail(todoId);
  })
)

router.get(
  "/month/chart",
  asyncHandler(async (req, res) => {
    return await todoSev.getTodoEcharts(req.query);
  })
)
module.exports = router;
