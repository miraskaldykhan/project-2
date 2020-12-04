const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
const User = require('./models/User')

mongoose.connect('mongodb://localhost/mydatabase', {useNewUrlParser: true})

BlogPost.create({title: "titletitle", body: "bodybody"}, (error,blogpost)=> {
	console.log(error, blogpost)
})

/*
BlogPost.find({title: "titletitle"}, (error, blogpost)=>{
	console.log(error, blogpost);
})
*/
var id = "5fc65c5fc4f0203c7015a63b";
// BlogPost.findById(id, {
// 	title: "NEW TITLE"
// }, (error, blogpost) =>{
// 	console.log(error, blogpost)
// })

// BlogPost.findByIdAndUpdate(id, {
//     title: "NEW TITLE",
//     subtitle: "ASD"
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// });
// User.create({
//     username: 'Miras1',
//     password: 'qwe123321',
//     firstname: 'miras',
//     lastname: 'kaldykhan',
//     email: 'miras@gmail.com',
//     image: 'usericon.png'
// }, (error, user) => {
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("Result: ", user)
//     }
// })
// User.findById(id, function (err, docs) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Result : ", docs);
//     }
// });