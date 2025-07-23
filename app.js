const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
    
const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";


main()
    .then((res) => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);

}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);


app.get("/", (req, res) => {
    res.send("root is working");
});

//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// show route 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//create route
app.post("/listings", wrapAsync(async (req, res, next) => {

    const defaultUrl = "https://plus.unsplash.com/premium_photo-1749903201646-09435fb2b384?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const listingData = req.body.listing;

    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new ExpressError(400,result.error);
    }
    // If image is a string (user sent just a URL), convert it to object
    if (typeof listingData.image === "string") {
        listingData.image = {
            url: listingData.image
        };
    }

    // If image is not an object or URL is missing, set default
    if (typeof listingData.image !== "object" || !listingData.image.url || listingData.image.url.trim() === "") {
        listingData.image = {
            url: defaultUrl
        };
    }

    if (!req.body.listing) {
        throw next(new ExpressError(404, "Page Not Found!"));
    }
    const newListing = new Listing(listingData);
    await newListing.save();
    res.redirect("/listings");

}));

//edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//update route
app.put("/listings/:id", wrapAsync(async (req, res) => {
    if (!req.body.listing) {
        throw next(new ExpressError(404, "Page Not Found!"));
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");  
}))

//delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

//error handling
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//custom error building
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something Went Error" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

//port check
app.listen(port, () => {
    console.log(`server listning on ${port}`);
});

