const { getUser } = require("../Services/auth");

async function restrictToLoggedinUserOnly(req ,res , next){
    const userToken=req.cookies?.token;
    if(!userToken) return res.json({message:"Login First"});
    const user=getUser(userToken);
    if(!user) return res.json({message:"Invalid Token"});
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedinUserOnly,
    
}