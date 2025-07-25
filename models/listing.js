const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      set: (v) =>
        v && v.trim() !== ""
          ? v
          : "https://plus.unsplash.com/premium_photo-1749903201646-09435fb2b384?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  }
  ,
  price: Number,
  location: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);  // allows only letters and spaces
      },
      message: props => `"${props.value}" is not valid. Only letters and spaces are allowed in location.`,
    },
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);  // allows only letters and spaces
      },
      message: props => `"${props.value}" is not valid. Only letters and spaces are allowed in country.`,
    },
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;