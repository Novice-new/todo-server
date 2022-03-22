const moment = require("moment");

function getPrevDate(time = moment()) {
  const prevTime = moment(time).add(-1, "month");
  
  // 获取当月第一天是周几
  const curWeekday = time.startOf("month").weekday();
  // 需要往前计算的天数
  const prevDays = curWeekday === 0 ? 6 : curWeekday - 1
  // 上个月总共有多少天
  const prevMonthDays = prevTime.endOf("month").date();
  return {
    days: prevDays,
    start: prevMonthDays - prevDays + 1,
    month: prevTime.month() + 1,
    year: prevTime.year()
  }
}

function getNextDate(prevDays, time = moment()) {
  const nextTime = moment(time).add(1, "month");
  const nextDays = 42 - time.endOf("month").date() - prevDays;
  return {
    days: nextDays,
    end: nextDays,
    month: nextTime.month() + 1,
    year: nextTime.year()
  }
}

// 得到数据筛选条件
function getExtraFilter(baseFilter, time = moment()) {
  const prevInfo = getPrevDate(time);
  const nextInfo = getNextDate(prevInfo.days);
  const curFilter = {
    ...baseFilter,
    year: { $eq: time.year() },
    month: { $eq: time.month() + 1 },
  };
  const prevFilter = {
    ...baseFilter,
    year: { $eq: prevInfo.year },
    month: { $eq: prevInfo.month },
    date: { $gte: prevInfo.start }
  };
  const nextFilter = {
    ...baseFilter,
    year: { $eq: nextInfo.year },
    month: { $eq: nextInfo.month },
    date: { $lte: nextInfo.end }
  }
  return [
    curFilter,
    prevFilter,
    nextFilter
  ]
}

// 获取日期信息（年月日）
function getDateInfo(date) {
  const result = moment(date);
  return {
    year: result.year(),
    month: result.month() + 1,
    date: result.date()
  }
}

// [{label:"",value:""}]
function getChartData(year, month, data) {
  const len = moment().year(year).month(month - 1).endOf("month").date();
  const result = [];
  for (let i = 1; i <= len; i++) {
    const label = moment().year(year).month(month - 1).date(i).format("YYYY-MM-DD");
    const todo = data.find(item => item._id === label);
    if (todo) {
      result.push({
        label,
        value: todo.completed
      })
    } else {
      result.push({
        label,
        value: 0
      })
    }
  }
  return result;
}
module.exports = {
  getExtraFilter,
  getDateInfo,
  getChartData
};