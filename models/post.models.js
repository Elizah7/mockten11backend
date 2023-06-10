const mongoose = require("mongoose")



postShema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String
})

let postModel = mongoose.model("post",postShema)

module.exports = {postModel}