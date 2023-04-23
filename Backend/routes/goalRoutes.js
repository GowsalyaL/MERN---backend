const express = require('express')
const router = express.Router()
const {getGoals, setGoals, putGoals, deleteGoals} = require('../controllers/goalControllers')

const protect = require('../MiddleWare/authMiddleware')

router.route('/').get(protect, getGoals).post(protect,setGoals)

// router.put('/:id', putGoals)

router.route('/:id').put(protect, putGoals).delete(protect, deleteGoals)

module.exports = router;