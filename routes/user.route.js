const express = require("express")
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email, password} = req.body
    try{
        bcrypt.hash(password, 5/*Number of time increption used*/ , async(err, hash)=>{
            if(err){
                console.log({"msg":"Error Occured","error":err.message})
            }else{
                let user = new UserModel({name,email,password:hash})
                await user.save()
                res.send({"msg":"New user registered"})
            }
            // Store hash in your password DB.
        });
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email})
        let token = jwt.sign({userid:user[0]._id},"masai") // passing userID so that we get it when we decode{in auth middleware}
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    res.send({"msg":"Login Success","token":token})
                }else{
                    console.log({"msg":"Error Occured","error":err})
                }
            });
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

module.exports={
    userRouter
}
// --------------------------------------------------------