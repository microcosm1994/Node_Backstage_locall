const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 声明一个数据集 对象
const sloganSchema = new Schema({
  group: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  },
  slogan: {
    type: String
  },
  user: {
    type: Object
  }
})
// 将数据模型暴露出去
module.exports = mongoose.model('slogan', sloganSchema)
