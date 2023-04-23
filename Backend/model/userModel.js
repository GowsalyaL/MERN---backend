const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    email:{
        type: String,
        required : [true, 'Please add a email'],
        unique : [true, 'email id already exists']
    },
    password:{
        type : String,
        required : [true, 'Please add a password']
    }
},
{
    timstamps: true
})

module.exports = mongoose.model('users', userSchema )