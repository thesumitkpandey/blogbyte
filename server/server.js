const app=require("./app.js")
const mongoose=require("mongoose")
require("dotenv").config();

(async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(process.env.PORT, ()=>{
        console.log(`Server is listening on ${process.env.PORT}`)
        })
    }catch(err){
        console.log("ERROR : ", err)
    }
})()
