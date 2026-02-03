const express= require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const {connectToMongoDb}= require('./connection')
const User= require('./Model/User')

// connection to mongo
connectToMongoDb(process.env.MongoUrl)
.then(()=> console.log('MongoDb is connected to server'))
.catch(err=> console.log('Error ' , err));


const app= express();
const port= process.env.port ? parseInt(process.env.port) : 5000;

app.use(express.json());

app.get('/api/test' , (req, res)=>{
    res.json({ message :"backend is working"});
})

app.post('/api/auth/login' ,async (req , res)=>{
    const {email , password}=req.body;
    if(!email || !password) {
        return res.json({Error: "invalid Credentials"});
    }
    const user=await User.findOne({email , password});
    if(!user) return res.json({Error:"invalid Credentials"})
    res.json({message:"Login Successful "});
})


app.post('/api/auth/signup' , async(req, res)=>{
    const {name , email, password}= req.body;
    try{
        const user= await User.findOne({email});
        if(user) return res.json({Error : "Account already exist with this email"})
        await User.create({
            name ,
            email ,
            password,
        })
        return res.json({message:" Account created successfully "})
    }catch(err){
        console.log("Error " , err);
        return res.json({ error: "Something went wrong" });
    }
})

app.listen(port , ()=>{
    console.log('Server is live at : ' , port);
})