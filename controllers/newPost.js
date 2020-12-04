module.exports = (req,res)=>{
	if(req.session.userId){
		return res.render('newpost')	
	}
	res.redirect('/auth/login')
}