const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, has) => {
        if (err) cb(err)

        const filename = `${has.toString('hex')}-${file.originalname}`

        cb(null, filename)
      })
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/pjpeg',
      'image/gif',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('invalid file type'))
    }
  },
}
