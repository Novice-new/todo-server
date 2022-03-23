const Todo = require("../db/Todo");
const moogoose = require("mongoose");
const moment = require("moment");
const { getExtraFilter, getDateInfo, getChartData } = require("../utils/tool");

// 添加
exports.addTodo = async function (newTodo) {
  const dateInfo = getDateInfo(newTodo.time)
  const todo = Todo.create({ ...newTodo, ...dateInfo });
  return todo;
};

// 获取todo列表
exports.getTodoList = async function (querys) {
  if (querys.name) {
    querys.name = { $regex: querys.name };
  }
  const todos = Todo.find(querys).sort({ level: -1 });
  return todos;
};

exports.getTodoDetail = async function (id) {
  const todo = await Todo.findById(id);
  return todo;
};

// 删除todo
exports.deleteTodo = async function (id) {
  const result = await Todo.findByIdAndDelete(id);
  return result;
};

// 编辑todo(传入id，以及要更新的数据)
exports.editTodo = async function (id, todoData) {
  const newData = todoData.time ? { ...todoData, ...getDateInfo(todoData.time) } : todoData;
  const newTodo = await Todo.findByIdAndUpdate(
    id,
    { $set: newData },
    { new: true }
  );
  return newTodo;
};

// 获取当前月份下每天todo的信息
exports.getMonthTodo = async function ({ userId, time }) {
  const { year, month } = getDateInfo(time);
  userId = moogoose.Types.ObjectId(userId);
  const baseFilter = {
    userId: { $eq: userId },
    completed: 0,
  };
  const filter = getExtraFilter(baseFilter, moment().year(year).month(month - 1),)
  // 根据日期分组并统计总数与已完成总数
  const group = {
    _id: "$time",
    total: { $sum: 1 },
    todos: {
      $push: { name: "$name", id: "$_id" }
    }
  };
  const todos = await Todo.aggregate().match({ $or: filter }).group(group);
  return todos;
};

exports.getTodoEcharts = async function ({ userId, time }) {
  userId = moogoose.Types.ObjectId(userId);
  const { year, month } = getDateInfo(time);
  const filter = {
    userId: { $eq: userId },
    year: { $eq: year },
    month: { $eq: month }
  }
  const todos = await Todo.aggregate().match(filter).group({
    _id: "$time",
    total: { $sum: 1 },
    completed: { $sum: "$completed" },
  });
  return getChartData(year, month, todos)
}
