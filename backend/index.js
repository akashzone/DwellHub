

const express = require("express");
const app = express();
const PORT = 3000;


const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/DwellHub"
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("MongoDB connected successfully.")
}).catch(err => 
    console.log("Err : ",err)
);

app.get("/sample",(req,res)=>{
    
})

app.get("/test",(req,res)=>{
    res.send("test route is working.");
});



app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}!`);
});
