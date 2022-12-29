const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../Public'))
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

var storage_src = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../Public/Source'))
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


var upload = multer({ storage: storage })
var upload_src = multer({ storage: storage_src })

module.exports = {upload,upload_src}