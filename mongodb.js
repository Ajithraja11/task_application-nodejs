const {MongoClient,ObjectID}=require('mongodb')



const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

// const id=new ObjectID()
// console.log(id)

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
       return console,log("Unable to connect to database")
    }
    const db=client.db(databaseName)
    
    db.collection('users').deleteMany({
        age:31
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    /****************************************************** */
    
    //  db.collection('users').updateOne({
    //     _id:new ObjectID("5f2ec528d1095276a8f7ef0c")
    // },{
    //     $set:{
    //         name:'Reddy garu'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(console.error)
    // })

    /**************************************************************8 */
    // db.collection('users').find({age:31}).toArray((error,users)=>{
    //     console.log(users)
    // })
    /**********************************************************8 */
    // db.collection('users').findOne({name:'Arjun'},(error,result)=>{
    //     if(error)
    //     {
    //         console.log('unable to fetch...')
    //     }
    //     console.log(result)
    // })

    //******************************************* */
    // db.collection('users').insertOne({
    //     name:'Arun',
    //     age:31
    // },(error,result)=>{
    //     if(error)
    //     {
    //         return console.log("unable to insert user...")
    //     }

    //     console.log(result.ops)
    // })
    /******************************************* */
    // db.collection('users').insertMany([{
    //     name:'John',
    //     age:13
    // },{
    //     name:'Gunther',
    //     age:32
    // }],(error,result)=>{
    //     if(error)
    //      {
    //          return console.log("unable to insert user...")
    //      }

    //      console.log(result.ops)
    // })
    /*********************************************** */
    // db.collection('tasks').insertMany([{
    //     description:'Clean the house',
    //     completed:true
    // },{
    //     description:'Clean the car',
    //     completed:false
    // },{
    //     description:'Go for a run',
    //     completed:true
    // }],(error,result)=>{
    //     if(error)
    //       {
    //           return console.log("unable to insert user...")
    //       }

    //       console.log(result.ops)
    // })
    
})