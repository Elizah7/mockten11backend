const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")
const { auth } = require("./middlewares/auth")
require("dotenv").config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users",userRoutes)
app.use(auth)
app.use("/posts",postRoutes)

app.listen(process.env.port, async()=>{

    try {
        await connection
        console.log("mongodb")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})