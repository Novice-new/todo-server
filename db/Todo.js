const { Schema, model } = require("mongoose");
const moment = require("moment");
const TodoSchema = Schema({
  // todo名
  name: { type: String, required: true },
  // 是否已经完成
  completed: { type: Number, max: 1, min: 0, default: 0 },
  // 所属用户
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  // 创建年
  year: { type: Number, default: moment().year() },
  // 创建月
  month: { type: Number, default: moment().month() + 1 },
  // 创建日
  date: { type: Number, default: moment().date() },
  // 优先级别
  level: { type: Number, default: 1 },
  time: { type: String, default: moment().format("YYYY-MM-DD") }
}, {
  versionKey: false
});

const Todo = model("Todo", TodoSchema);
module.exports = Todo;
