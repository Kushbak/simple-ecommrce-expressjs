// const path = require('path')
// const multer = require('multer')
// const { GridFsStorage } = require('multer-gridfs-storage')
// const crypto = require("crypto");
// const { URI } = require('../config')

// const storage = new GridFsStorage({
//   url: URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) return reject(err)
//         const filename = buf.toString('hex') + path.extname(file.originalname)
//         const fileInfo = {
//           filename,
//           bucketName: 'uploads'
//         }
//         resolve(fileInfo)
//       })
//     })
//   }
// })

// const upload = multer({ storage })

// module.exports = upload