const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')
const User = require('./models/User')
const Comment = require('./models/Comment')


const fileUpload = require('express-fileupload')

const validateMiddleware = require('./middleware/validateMiddleware')

const storeCommentController = require('./controllers/storeComment')
const getProfile = require('./controllers/getProfile')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const homeController = require('./controllers/home')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const logoutController = require('./controllers/logout')

const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.use(fileUpload())

mongoose.connect('mongodb://localhost/mydatabase', {useNewUrlParser: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set('view engine', 'ejs')
app.listen(2020, () => {
    console.log('App is listening on the port 2020')
})
app.use(expressSession({
    secret: 'keyboard cat'
}))


app.get('/day-1', (req, res) => {
    res.render('day-1')
})
app.get('/day-2', (req, res) => {
    res.render('day-2')
})
app.get('/day-3', (req, res) => {
    res.render('day-3')
})
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.get('/account/profile', async (req, res) => {
    const user = await User.findById(loggedIn);
    console.log(user)
    res.render('profile', {
        user
    });
})
app.get('/account/change', async (req, res) => {
    const user = await User.findById(loggedIn);
    console.log(req.params.id)
    res.render('change_profile', {
        user
    });
})
app.post('/account/change/do', (req, res) => {
    User.findByIdAndUpdate(loggedIn, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
    }, (error, user) => {
        console.log(error, user)
    });
    res.redirect('/account/profile')
})
// app.post('/comment/add', async (res, req) => {
//     await Comment.create({
//         ...req.body,
//         userid: loggedIn
//     })
//     res.redirect('/post/:id')
// })
app.post('/comment/add', authMiddleware, storeCommentController)
app.use('/post/store', validateMiddleware)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/post/:id', getPostController)
app.get('/', homeController)
app.get('/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'))