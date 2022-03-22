const mongoose = require("mongoose");
const { dbPath } = require("../config/base");
mongoose.connect(dbPath, () => {
  console.log("db conncet successed");
});
