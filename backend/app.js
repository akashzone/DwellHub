//Imports
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

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
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate)

//show all
app.get("/listings", async (req, res) => {
  let sampleListing = await Listing.find({});
  res.render("index", { sampleListing });
});

//home route

app.get("/",(req,res)=>{
  res.send("root route working");
});

//create route
app.get("/listings/new", async (req, res) => {
  res.render("new.ejs");
});

app.post("/listings", async (req, res) => {
  let { title, description, price, location, country } = req.body;
  let newListing = new Listing({
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
  });
  await Listing.insertOne(newListing);
//   console.log(newListing);
  res.redirect("/listings");
});

// show route - shows individual listing
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
//   console.log(listing);
  res.render("show.ejs", { listing });
});

// edit route - to edit listing.
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs",{listing});
});

app.put("/listings/:id", async (req,res)=>{
let {id} = req.params;
  let { title, description, price, location, country } = req.body;
  console.log(title);
  let updatedListing = {
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
  };
  console.log(updatedListing);
  await Listing.findByIdAndUpdate(id, {...updatedListing})
  res.redirect(`/listings/${id}`)
})


//Delete route - to delete listings..

app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log("deletedListing :",deletedListing );
    res.redirect(`/listings`)
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
