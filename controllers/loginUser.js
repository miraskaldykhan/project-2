const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req,res)=>{
	const {username, password} = req.body;

	User.findOne({username:username}, (error, user)=>{
		if(user){
			bcrypt.compare(password, user.password, (error, same)=>{
				if(same){
					req.session.userId = user._id
					res.redirect('/')
				}
				else{
					res.render('login', {message: "Password worry"})
					console.log("passwprd worry")
				}
			})
		}
		else{
			res.render('login', {message: "User doesn't exist"})
			console.log("user worry")
		}
	})
}