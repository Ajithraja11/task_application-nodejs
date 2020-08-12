const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())


app.listen(port,()=>{
    console.log('server is up on port '+port)
})

//adding user
app.post("/users",async (req,res)=>{
   const user=new User(req.body)
   try{
        await user.save()
        res.status(201).send()
   }catch(e){
        res.status(400).send(e)
   }
    
})

//reading all users
app.get('/users',async(req,res)=>{
   
    try{
        const users=await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
   
})

//reading a single user
app.get('/users/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const user=await User.findById(_id)
        if(!users)
            return res.status(404).send()
         res.send(users)
    }catch(e){
        res.status(500).send()
    }
    
})

//adding task
app.post('/tasks',async(req,res)=>{
    const task=new Task(req.body)
    try{
        const tasks=await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})

//reading all tasks
app.get('/tasks',async(req,res)=>{
    
    try{
        const tasks=await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
    
})

//reading a single task
app.get('/tasks/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findById(_id)
        if(!task)
              return res.status(404).send()
         res.send(task)
    }catch(e){
        res.status(500).send()
    }
    
})