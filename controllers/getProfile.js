const User = require('../models/User.js')
module.exports = async(req,res)=>{
    console.log(req.body)
    const user = await User.findById(loggedIn);
    console.log(user)
    res.render('profile',{
        user
    });
}