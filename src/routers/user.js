
const expres = require('express')
const router=new expres.Router()
const User=require('../models/user')
const auth=require('../middleware/auth')
const { request } = require('express')
const multer=require('multer')
const {sendWelcomeEmail,sendCancellationEmail}=require('../emails/account')

//adding user
router.post("/users",async (req,res)=>{
    const user=new User(req.body)
    try{
         await user.save()
         sendWelcomeEmail(user.email,user.name)
         const token=await user.generateAuthToken()
         res.status(201).send({user,token})
    }catch(e){
         res.status(400).send(e)
    }
     
 })
 
//user login
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})
 
 //reading user
 router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)    
 })
  
 //updating existing user
 router.patch('/users/me',auth,async(req,res)=>{
    
     const updates=Object.keys(req.body)
     const allowedUpdates=['name','email','age','password']
     const isValidOperation=updates.every((update)=>{
         return allowedUpdates.includes(update)
     })
     if(!isValidOperation){
         return res.status(400).send({error:'Invalid update.'})
     }
     try{
         
        
         updates.forEach((update)=>{
            req.user[update]=req.body[update]
         })
         await req.user.save() 
         res.send(req.user)  
     }catch(e){
         res.status(400).send(e)
     }
 })
 
 //delete a user
 router.delete('/users/me',auth,async(req,res)=>{
     try{
        
        await req.user.remove()
        sendCancellationEmail(req.user.email,req.user.name)
         res.send(req.user)
     }catch(e){
         res.status(500).send()
     }
 })
 
//logout user
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//logout of all session
router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//upload profile picture
const upload=multer({
    
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return callback(new Error('Please upload a image.'))
        }
        callback(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
   req.user.avatar=req.file.buffer
   await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

//delete user profile_pic
router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

//getting user profile pic
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})


module.exports=router