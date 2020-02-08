require('dotenv/config')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, has) => {
        if (err) cb(err)

        file.key = `${has.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'uploadnatanaelvich',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, has) => {
        if (err) cb(err)

        const filename = `${has.toString('hex')}-${file.originalname}`

        cb(null, filename)
      })
    },
  }),
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: storageTypes[process.env.STORAGE_TYPE],
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
