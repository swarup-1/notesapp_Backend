const jwt = require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userid // adding (userID) in note object.
                next()
            }else{
                res.send("Please Login")
            }
        })
    }else{
        res.send("Please Login")
    }
}

module.exports={
    auth
}
// --------------------------------------------------------