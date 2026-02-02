const express= require('express');
require('dotenv').config();

const app= express();
const port= process.env.port ? parseInt(process.env.port) : 5000;

app.get('/api/test' , (req, res)=>{
    res.json({ message :"backend is working"});
})




app.listen(port , ()=>{
    console.log('Server is live at : ' , port);
})