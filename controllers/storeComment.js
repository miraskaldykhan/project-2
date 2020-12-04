const Comment = require('../models/Comment')
const path = require('path')
module.exports = async (req, res) => {
    asd = req.body.iden
    await Comment.create({
        ...req.body,
        userid: req.session.userId
    })
    res.redirect('/')
}