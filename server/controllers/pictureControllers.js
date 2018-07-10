const fs = require('fs')
const path = require('path')
const oss = require('ali-oss')
const co = require('co')
const async = require('async')
const crypto = require('crypto')
const source = require(path.join(__dirname, '../models/source.js'))
const User = require(path.join(__dirname, '../models/users.js'))
const slogan = require(path.join(__dirname, '../models/slogan.js'))

const client = new oss.Wrapper({
  region: 'oss-cn-hongkong',
  accessKeyId: 'LTAIp9nawQ9RrKoh',
  accessKeySecret: 'KbbO2NtCBYaDVu09vzXv3JkFFHHtYK',
  bucket: 'eago'
})

exports.upload = (req, res) => {
  let result = {status: 0, message: '上传成功'}
  const hash = crypto.createHash('md5')
  let filename = hash.update(req.file.originalname.slice(0, req.file.originalname.indexOf('.')) + '-' + Math.random() * 100).digest('hex')
  async.auto({
    func1: function (callback) {
      let address = path.join('/home/sex.eago.world/data', filename + '.' + req.file.mimetype.split('/')[1])
      let readable = fs.createReadStream(path.join('/usr/local/server/uploads/', req.file.filename)) // 创建读取流
      let writable = fs.createWriteStream(address)// 创建写入流
      readable.pipe(writable)
      writable.on('finish', function () {
        callback(null, address)
      })
    },
    func2: ['func1', function (results, callback) {
      fs.unlinkSync(path.join('/usr/local/server/uploads/', req.file.filename))
      callback(null)
    }]
  }, function (err, results) {
    if (err) throw err
    result.data = {
      name: filename + '.' + req.file.mimetype.split('/')[1],
      url: results.func1.replace(/\/home\//, 'http://')
    }
    res.json(result)
  })
}

exports.detailed = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  source.findById(query._id, (err, data) => {
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

exports.slogan_detailed = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  slogan.findById(query._id, (err, data) => {
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

exports.update = (req, res) => {
  let query = {}
  query.source = req.body.source
  query.sourceName = req.body.source.Angle
  query.terrace = req.body.source.terrace
  query.country = req.body.source.country
  let result = {status: 0, message: '素材内容已更新'}
  source.findByIdAndUpdate(req.body._id, query, {new: true}, (err, data) => {
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

exports.slogan_update = (req, res) => {
  let query = req.body.slogan
  let result = {status: 0, message: '素材内容已更新'}
  slogan.findByIdAndUpdate(req.body._id, query, {new: true}, (err, data) => {
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

exports.del = (req, res) => {
  let result = {status: 0, message: '已删除'}
  source.findByIdAndRemove(req.query._id, (err, data) => {
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

exports.slogan_del = (req, res) => {
  let result = {status: 0, message: '已删除'}
  slogan.findByIdAndRemove(req.query._id, (err, data) => {
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

exports.portrait = (req, res) => {
  let result = {status: 0, message: '头像上传成功'}
  let portraitName = req.cookies._name
  let file = req.files[portraitName]
  let fileName = file.name
  let filePath = file.path
  co(function* () {
    var results = yield client.put('/portrait/' + fileName, filePath)
    User.findOneAndUpdate({username: portraitName}, {portrait: results.url}, {new: true}, (err, data) => {
      if (err) throw err
      if (data) {
        result.data = data
        result.status = 0
        res.json(result)
      } else {
        result.status = 1
        result.meesage = '头像上传失败，请稍后再试'
        res.json(result)
      }
    })
  }).catch(function (err) {
    if (err) {
      res.status(503)
      res.set('Content-Type', 'application/json charset=utf-8')
      res.json(err)
    }
  })
}

// co(function* () {
//   var result = yield client.listBuckets()
//   console.log(result)
// }).catch(function (err) {
//   console.log(err)
// })
