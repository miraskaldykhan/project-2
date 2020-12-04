const BlogPost = require('../models/BlogPost.js')
const Comment = require('../models/Comment')
module.exports = async(req,res)=>{
	const blogpost = await BlogPost.findById(req.params.id).populate('userid');
	const comment = await Comment.find({}).populate('userid');
	console.log(blogpost)
	res.render('post',{
		blogpost, comment
	});
}