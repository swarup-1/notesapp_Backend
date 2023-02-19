const express = require("express")
const { connection } = require("./db")
const { auth } = require("./middleware/auth.middleware")
const { noteRouter } = require("./routes/note.route")
const { userRouter } = require("./routes/user.route")
require('dotenv').config()
const cors = require('cors')

const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log('err:', err)
    }
    console.log(`server running at PORT ${process.env.port}`)
})

// --------------------------------------------------------