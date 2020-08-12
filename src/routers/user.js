
const expres = require('express')
const router=new expres.Router()
const User=require('../models/user')

//adding user
router.post("/users",async (req,res)=>{
    const user=new User(req.body)
    try{
         await user.save()
         res.status(201).send()
    }catch(e){
         res.status(400).send(e)
    }
     
 })
 
 //reading all users
 router.get('/users',async(req,res)=>{
    
     try{
         const users=await User.find({})
         res.send(users)
     }catch(e){
         res.status(500).send()
     }
    
 })
 
 //reading a single user
 router.get('/users/:id',async(req,res)=>{
     const _id=req.params.id
     try{
         const user=await User.findById(_id)
         if(!user)
             return res.status(404).send()
          res.send(user)
     }catch(e){
         res.status(500).send()
     }
     
 })
 
 //updating existing user
 router.patch('/users/:id',async(req,res)=>{
     const updates=Object.keys(req.body)
     const allowedUpdates=['name','email','age','password']
     const isValidOperation=updates.every((update)=>{
         return allowedUpdates.includes(update)
     })
     if(!isValidOperation){
         return res.status(400).send({error:'Invalid update.'})
     }
     try{
         const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
         if(!user)
             return res.status(404).send()
         res.send(user) 
     }catch(e){
         res.status(400).send(e)
     }
 })
 
 //delete a user
 router.delete('/users/:id',async(req,res)=>{
     try{
         const user=await User.findByIdAndDelete(req.params.id)
         if(!user)
         {
             res.status(404).send()
         }
         res.send(user)
     }catch(e){
         res.status(500).send()
     }
 })
 
module.exports=router