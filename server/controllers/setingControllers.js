// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
// const db = require(path.join(__dirname, '../mongo/db.js'))
// const crypto = require('crypto')
const Seting = require(path.join(__dirname, '../models/setings.js'))

exports.getconfig = (req, res) => {
  let result = {status: 0, message: '获取配置信息成功'}
  Seting.find({type: 'admin'}, (err, data) => {
    if (err) throw err
    if (data) {
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '获取配置信息失败'
      res.json(result)
    }
  })
}

exports.saveconfig = (req, res) => {
  let result = {status: 0, message: '保存成功'}
  let query = req.body
  Seting.replaceOne({type: 'admin'}, query, (err, data) => {
    if (err) throw err
    if (data) {
      res.json(result)
    } else {
      result.status = 1
      result.message = '保存失败，服务器错误'
      res.json(result)
    }
  })
}

exports.defaults = (req, res) => {
  let result = {status: 0, message: '保存成功'}
  Seting.remove({}, (err, data) => {
    if (err) throw err
    if (data) {
      Seting.create({}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          res.json(result)
        } else {
          result.status = 1
          result.message = '保存失败，服务器错误'
          res.json(result)
        }
      })
    } else {
      result.status = 1
      result.message = '服务器发生错误，请稍后再试'
      res.json(result)
    }
  })
}
