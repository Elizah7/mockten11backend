
const express = require("express")
const { postModel } = require("../models/post.models")

const postRoutes = express.Router()




postRoutes.get("/",async(req,res)=>{
      const id = req.body.userId
      const device = req.query.device
      console.log("id",id)
    try {
           if(device){
            const totalpost = await postModel.find({userId:id,device})
            res.status(200).send({data:totalpost})
           }
           else{
            const totalpost = await postModel.find({userId:id})
            res.status(200).send({data:totalpost})
           }
           
        
  
    } catch (error) {
        res.status(404).send({msg:error})
    }
})


postRoutes.post("/add",async(req,res)=>{
    console.log(req.body)
     try {
        const newpost = new postModel(req.body)
        await newpost.save()
        res.status(200).send({msg:newpost})
     } catch (error) {
        
     }
})
postRoutes.patch("/update/:id",async(req,res)=>{
     const id = req.params.id
     try {
        await postModel.findByIdAndUpdate(id,req.body)
        const updateddata = await postModel.findById(id) 
        res.status(200).send({data:updateddata})
     } catch (error) {
        res.status(404).send({msg:error})
     }
})
postRoutes.delete("/delete/:id",async(req,res)=>{
    const id = req.params._id
    try {
        const updateddata = await postModel.findByIdAndDelete(id)
       res.status(200).send({data:updateddata})
    } catch (error) {
       res.status(404).send({msg:error})
    }
})


module.exports = postRoutes
