const express = require('express')
const router = express.Router()
const  {registerUser, loginUser, getMe}= require('../controllers/userControllers')


const protect = require('../MiddleWare/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getme', protect, getMe)

module.exports = router