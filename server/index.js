const express= require('express');

const app= express();
const port=5000;

app.get('/api/test' , (req, res)=>{
    res.json({ message :"backend is working"});
})

app.listen(port , ()=>{
    console.log('Server is live at : ' , port);
})