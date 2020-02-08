const Post = require('../models/Post')

module.exports = {
  async index(req, res) {
    const posts = await Post.find()

    res.json(posts)
  },

  async destroy(req, res) {
    const { id } = req.params

    const post = await Post.findById(id)

    post.remove()

    res.json({})
  },

  async store(req, res) {
    const { originalname, size, key, location: url = '' } = req.file
    const post = await Post.create({
      name: originalname,
      size,
      key,
      url,
    })

    res.json(post)
  },
}
