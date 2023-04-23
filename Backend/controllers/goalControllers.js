const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require ('../model/userModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user : req.user.id})
    res.json(goals)
})

const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("please enter text ");
    } 

    const goal = await Goal.create({
        text: req.body.text,
        user : req.user.id
    })

    res.json(goal)

})


const putGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    
    if(!req.user){ss
        res.status(400)
        throw new Error ('User not found')
    }

    if (goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User unauthorized')
    }

    await Goal.findByIdAndUpdate(req.params.id, req.body)

    const updatedGoal = await Goal.findById(req.params.id)

    res.json(updatedGoal);
})

const deleteGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }



    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('Unauthorized')
    }

    await Goal.findByIdAndRemove(req.params.id)

    res.json({id : req.params.id})
})


module.exports = {
    getGoals,
    setGoals,
    putGoals,
    deleteGoals
}