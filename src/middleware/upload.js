const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
}) 

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    console.log(file)
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      console.log('only images supported')
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})

module.exports = upload