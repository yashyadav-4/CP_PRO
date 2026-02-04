const express= require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const {connectToMongoDb}= require('./connection')
const User= require('./Model/User')
const cookieParser= require('cookie-parser')
const userRoute= require('./Routes/User')
const {restrictToLoggedinUserOnly} = require('./Middlewares/auth')

// connection to mongo
connectToMongoDb(process.env.MongoUrl)
.then(()=> console.log('MongoDb is connected to server'))
.catch(err=> console.log('Error ' , err));


const app= express();
const port= process.env.port ? parseInt(process.env.port) : 5000;


// prebuilt middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for forms
app.use(cookieParser());


//Routes
app.use('/api/auth' , userRoute);


// mine made middlewares
app.use(restrictToLoggedinUserOnly);


// test
app.get('/api/test' , (req, res)=>{
    res.json({ message :"backend is working"});
})


app.listen(port , ()=>{
    console.log('Server is live at : ' , port);
})