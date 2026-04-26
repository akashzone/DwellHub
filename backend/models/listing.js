const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
        : v,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Listing", listingSchema);
