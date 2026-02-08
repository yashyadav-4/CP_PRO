const jwt= require('jsonwebtoken')

const Secret=process.env.Secret;

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    } , Secret , {expiresIn :'7d'});
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token , Secret);
    }catch(err){
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}