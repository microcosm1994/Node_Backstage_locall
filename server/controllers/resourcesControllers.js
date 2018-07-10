// const fs = require('fs')
const path = require('path')
const source = require(path.join(__dirname, '../models/source.js'))
const slogan = require(path.join(__dirname, '../models/slogan.js'))

exports.all = (req, res) => {
  let result = {status: 0, message: '成功'}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  source.count({}, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      source.find({}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 0
          result.message = '没有数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 0
      result.message = '没有数据'
      res.json(result)
    }
  })
}

exports.slogan_all = (req, res) => {
  let result = {status: 0, message: '成功'}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  slogan.count({}, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      slogan.find({}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 0
          result.message = '没有数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 0
      result.message = '没有数据'
      res.json(result)
    }
  })
}

exports.save = (req, res) => {
  let result = {status: 0, message: '保存成功'}
  let reqData = req.body
  source.create(reqData, (err, data) => {
    if (err) throw err
    if (data) {
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.slogansave = (req, res) => {
  let result = {status: 0, message: '保存成功'}
  let reqData = req.body
  slogan.create(reqData, (err, data) => {
    if (err) throw err
    if (data) {
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.find = (req, res) => {
  let result = {status: 0, message: '查找成功'}
  let query = {}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  for (let key in req.query) {
    let regexp = new RegExp(req.query[key])
    if (key === 'sourceName') query.sourceName = regexp
    if (key === 'country') query.country = regexp
    if (key === 'terrace') query.terrace = regexp
  }
  source.count(query, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      source.find(query, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 1
          result.message = '没有找相关到数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 1
      result.message = '没有找到相关数据'
      res.json(result)
    }
  })
}

exports.sloganfind = (req, res) => {
  let result = {status: 0, message: '查找成功'}
  let query = {}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  for (let key in req.query) {
    let regexp = new RegExp(req.query[key])
    if (key === 'slogan') query.slogan = regexp
    if (key === 'slogantitle') query.title = regexp
  }
  slogan.count(query, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      slogan.find(query, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 1
          result.message = '没有找到相关数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 1
      result.message = '没有找到相关数据'
      res.json(result)
    }
  })
}

exports.personal = (req, res) => {
  let result = {status: 0, message: '数据获取成功'}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  source.count({'user.username': req.cookies._name}, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      source.find({'user.username': req.cookies._name}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 1
          result.data = null
          result.message = '没有数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 1
      result.data = null
      result.message = '没有数据'
      res.json(result)
    }
  })
}

exports.slogan_personal = (req, res) => {
  let result = {status: 0, message: '数据获取成功'}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  console.log(req.cookies._name)
  slogan.count({'user.username': req.cookies._name}, (err, data) => {
    if (err) throw err
    if (data) {
      console.log(data)
      let count = data
      slogan.find({'user.username': req.cookies._name}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 1
          result.data = null
          result.message = '没有数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 1
      result.data = null
      result.message = '没有数据'
      res.json(result)
    }
  })
}
