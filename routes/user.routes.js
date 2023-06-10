
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModel} = require("../models/user.models")

const userRoutes = express.Router()





userRoutes.post("/register",async(req,res)=>{
    
    const {email,password,name,gender} = req.body
    console.log(req.body)
    try {
        const singleuser = await userModel.find({email})
        console.log(singleuser)
        if(singleuser.length>0){
            res.status(404).send("user already exists")
        }
        else{
            bcrypt.hash(password,5,async(err,hashed)=>{
                if(err){
                    res.status(404).send(err)
                }
                else{
                    const newuser = new userModel({name,email,gender,password:hashed})
                    await newuser.save()
                    res.send({msg:"account created succesfully",data:newuser})
                }
          
            })
        }
    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})
userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const singleuser = await userModel.find({email})
        if(singleuser.length>0){
            console.log(singleuser)
            bcrypt.compare(password, singleuser[0].password, (err, result)=> {
                console.log(result)
               if(result){
                console.log("res",result)
                jwt.sign({ userId: singleuser[0]._id }, "masai",(err, token)=> {
                     if(token){
                        console.log("token",token)
                        res.status(200).send({msg:"login succesfully",token:token})
                     }
                     else{
                        res.status(404).send({msg:err,e:"error from jwt"})
                     }
                  });
               }
               else{
                console.log(err)
                res.status(404).send({msg:err,e:"error from bcr"})
               }
            });
        }
    } catch (error) {
        res.status(404).send({msg:error.message})
    }
})



module.exports = userRoutes
