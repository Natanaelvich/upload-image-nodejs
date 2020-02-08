const Post = require('../models/Post')

module.exports = {
  async store(req, res) {
    const { originalname, size, filename } = req.file
    const post = await Post.create({
      name: originalname,
      size,
      key: filename,
      url: '',
    })

    res.json(post)
  },
}
