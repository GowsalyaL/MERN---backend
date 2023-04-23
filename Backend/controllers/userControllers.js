const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Users  = require('../model/userModel')


const registerUser = asyncHandler(async(req, res) =>{ 
    const {name,email,password} = req.body
    if(!email || !name || !password){
        res.status(400)
        throw new Error ("Please enter all fields")
    }
    const userExists = await Users.findOne({email})
    if(userExists){
        throw new Error ("User already Exists")
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const user = await Users.create({
        name,email,password:hashedPassword
    })

    if(user){
        res.status(200).json({
            _id : user.id,
            name : user.name,
            email: user.email,
            token : generateJWT(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error ('Invalid user Data')
    }
})

const loginUser = asyncHandler(async(req,res) =>{
   const {email, password} = req.body
   const user = await Users.findOne({email})
   if(user && (await bcryptjs.compare(password, user.password))){
    res.json({
        _id : user.id,
        name : user.name,
        email: user.email, 
        token : generateJWT(user.id)
    })

   }else{
    res.status(200)
    throw new Error("Invalid Credentials")
   } 
})

const generateJWT = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}

const getMe = asyncHandler(async(req,res) =>{

    res.status(400).json(req.user)
})

module.exports ={
    registerUser,
    loginUser,
    getMe
}