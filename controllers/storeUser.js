const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    const {username, firstname, lastname, email, password, ConfirmPassword} = req.body;
    let image = req.files.photo;
    if (password === ConfirmPassword) {
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
            User.create(req.body, (error, user) => {
                if (error) {
                    return res.render('register', {message: error});
                }
                res.redirect('/')
            })
        })
    } else {
        res.render('register', {message: "Passwords don't match"});
        console.log("Passwords don't confirm")
    }
}