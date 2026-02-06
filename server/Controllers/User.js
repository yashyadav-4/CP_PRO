const User= require('../Model/User');
const {setUser, getUser}= require('../Services/auth')

function handleVerifyAuth(req, res) {
    const token = req.cookies?.token;
    const user = getUser(token);
    return res.json({ authenticated: !!user });
}

async function handleUserSignup(req , res){
    const { name , email , password }= req.body;
    try{
        const user= await User.findOne({email});
        if(user) return res.json({message : "Account already exist with this email"})
        await User.create({
            name ,
            email ,
            password,
        })
        return res.json({message:" Account created successfully "})
    }catch(err){
        console.log("Error " , err);
        return res.json({ message: "Something went wrong" });
    }
}

async function handleUserLogin(req , res){
    const {email , password}=req.body;
    if(!email || !password) {
        return res.json({Error: "invalid Credentials"});
    }
    const user=await User.findOne({email , password});
    if(!user) return res.json({message:"invalid Credentials"})
    const token=setUser(user);
    res.cookie('token' , token);
    res.json({message:"Login Successful "});
}

module.exports={
    handleUserSignup,
    handleUserLogin,
    handleVerifyAuth,
    
}