//Imports
const path = require("path");

//Express connection
const express = require("express");
const app = express();
const PORT = 8080;

//Mongoose connection
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/DwellHub";
async function main() {
  await mongoose.connect(MONGO_URL);
}

const Listing = require("./models/listing.js");
main()
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => console.log("Err : ", err));

//Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//show all
app.get("/listings", async (req, res) => {
  let sampleListing = await Listing.find({});
  res.render("index", { sampleListing });
});

// show route - shows individual listing
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    res.render("show.ejs",{listing});
})

// app.get("/testListing", async (req,res)=>{
//     const sampleListing = new Listing({
//         title: "New Home - 2",
//         description: "It feels like your own house.",
//         price: "$299/night",
//         location: "Mumbia,Dharavi",
//         country: "India"
//     });

//     await sampleListing.save().then(()=>{
//         console.log("Successfully inserted sample data!");
//         res.send(sampleListing)
//     }).catch(err =>
//         console.log("Err :",err)
//     )
// })

app.get("/test", (req, res) => {
  res.send("test route is working.");
});

//Server listens to port 3000
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}!`);
});
