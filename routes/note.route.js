const express = require("express")
const { NoteModel } = require("../model/note.model")

const noteRouter = express.Router()

noteRouter.get("/",async(req,res)=>{
    const ID = req.body.user
    try{
        console.log('ID:', ID)
        const notes = await NoteModel.find({user:ID})
        res.send(notes)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
noteRouter.post("/create", async(req,res)=>{
    const payload = req.body
    const newNote = new NoteModel(payload)
    await newNote.save()
    res.send(newNote)
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        await NoteModel.findByIdAndDelete({_id:ID})
        res.send(`Note with ID ${ID} Deleted`)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
noteRouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        let data = await NoteModel.findByIdAndUpdate({_id:ID},req.body)
        res.send(data)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

module.exports={
    noteRouter
}
// --------------------------------------------------------