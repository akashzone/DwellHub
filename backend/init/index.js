
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/DwellHub";
const initData = require("./data.js");

async function main(){
    await mongoose.connect(MONGO_URL);
}

const Listing = require("../models/listing.js")
main().then(()=>{
    console.log("MongoDB connected successfully.")
}).catch(err => 
    console.log("Err : ",err)
);


async function initDB(){
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Saved sample data successfully.");
}

initDB();