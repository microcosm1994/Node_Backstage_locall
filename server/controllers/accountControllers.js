// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
// const db = require(path.join(__dirname, '../mongo/db.js'))
const crypto = require('crypto')
const User = require(path.join(__dirname, '../models/users.js'))

exports.login = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  let users = req.body
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  console.log(users.password)
  User.findOne(users, '-password', (err, data) => {
    if (err) throw err
    if (data) {
      let id = data._id.toString()
      let expires = 10 * 24 * 60 * 60 * 1000
      res.cookie('_id', id, {
        domain: 'sex.eago.world',
        maxAge: expires,
        path: '/'
      })
      console.log(data)
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '用户名或密码错误'
      res.json(result)
    }
  })
}

exports.logout = (req, res) => {
  res.clearCookie('_id', {
    domain: '.sex.eago.world',
    path: '/'
  })
  res.json({
    status: 0,
    message: '已清除你的登录信息'
  })
}

exports.register = (req, res) => {
  let result = {status: 0, message: '注册成功'}
  let users = {}
  if (users.username === 'admin') {
    result.status = 1
    result.message = '不能以“admin"为账号进行注册'
    res.json(result)
  }
  users.nickname = req.body.nickname
  users.username = req.body.username
  users.password = crypto.createHash('md5').update(req.body.password).digest('hex')
  users.portrait = req.body.portrait ? req.body.portrait : ''
  users.isAdmin = req.body.isAdmin
  User.findOne({username: users.username}, (err, data) => {
    if (err) throw err
    if (data) {
      result.status = 1
      result.message = '该账号已经被注册'
      res.json(result)
    } else {
      User.create(users, (err, data) => {
        if (err) throw err
        if (data) {
          result.status = 0
          result.message = '注册成功'
          res.json(result)
        } else {
          result.status = 1
          result.message = '服务器错误'
          res.json(result)
        }
      })
    }
  })
}

exports.user = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  User.findById(query._id, '-password', (err, data) => {
    if (err) throw err
    if (data) {
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.getaccount = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  User.find({}, '-password', (err, data) => {
    if (err) throw err
    if (data) {
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.updateAccount = (req, res) => {
  let result = {status: 0, message: '密码已修改成功'}
  let id = req.body._id
  let query = {}
  query.nickname = req.body.nickname
  query.password = crypto.createHash('md5').update(req.body.password).digest('hex')
  query.portrait = req.body.portrait ? req.body.portrait : ''
  query.isAdmin = req.body.isAdmin ? req.body.isAdmin : false
  User.findByIdAndUpdate(id, query, {new: true}, (err, data) => {
    if (err) throw err
    if (data) {
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.delAccount = (req, res) => {
  let result = {status: 0, message: '账号已删除'}
  User.findById(req.body._id, (err, data) => {
    if (err) throw err
    if (data) {
      if (data.username === 'admin') {
        result.status = 1
        result.message = '不能删除管理员账号'
        res.json(result)
      } else {
        User.findByIdAndRemove(req.body._id, (err, data) => {
          if (err) throw err
          if (data) {
            result.status = 0
            result.message = '账号已删除'
            res.json(result)
          } else {
            result.status = 1
            result.message = '服务器错误'
          }
        })
      }
    }
  })
}
