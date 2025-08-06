const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); 
const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("DB Connection Error:", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Existing listings deleted");

    //Fetch an existing user dynamically
    const ownerUser = await User.findOne(); 
    if (!ownerUser) {
        console.log("No user found. Please create a user first.");
        return;
    }

    const updatedData = [];
    for (let listing of initData.data) {
        listing.owner = ownerUser._id; 

        // Fetch coordinates using Nominatim API
        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${listing.location},${listing.country}&format=json&limit=1`
        );
        const geoData = await geoRes.json();

        if (geoData.length > 0) {
            listing.lat = geoData[0].lat;
            listing.lng = geoData[0].lon;
        } else {
            console.log(`No coordinates found for: ${listing.location}, ${listing.country}`);
        }

        updatedData.push(listing);
    }

    await Listing.insertMany(updatedData);
    console.log("Data initialized with dynamic owner and lat/lng");
};

initDB();
