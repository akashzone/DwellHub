//Imports

//Express connection
const express = require("express");
const app = express();
const PORT = 3000;

//Mongoose connection
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/DwellHub"
async function main(){
    await mongoose.connect(MONGO_URL);
}

const Listing = require("./models/listing.js")
main().then(()=>{
    console.log("MongoDB connected successfully.")
}).catch(err => 
    console.log("Err : ",err)
);

app.get("/sample", async (req,res)=>{
    const sampleListing = new Listing({
        title: "New Home",
        description: "Sweet place to leave.",
        price: "$199/night",
        location: "Mumbia,Sion",
        country: "India"
    });

    await sampleListing.save().then(()=>{
        console.log("Successfully inserted sample data!");
        res.send("Inserted Successfully")
    }).catch(err => 
        console.log("Err :",err)
    )
})

app.get("/test",(req,res)=>{
    res.send("test route is working.");
});


//Server listens to port 3000
app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}!`);
});
