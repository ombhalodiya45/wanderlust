const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js")

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//index route
router.get("/", async (req, res) => {
    const allListings = await Listing.find();
    req.flash("success","New Listing Created!");
    res.render("listings/index.ejs", { allListings });
});

//new route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// show route 
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing You Requested Does Not Exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

//create route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {

    const defaultUrl = "https://plus.unsplash.com/premium_photo-1749903201646-09435fb2b384?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const listingData = req.body.listing;
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
    req.flash("success","New Listing Created!");
    return res.redirect("/listings");

}));

//edit route
router.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing You Requested Does Not Exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
});

//update route
router.put("/:id", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success","Listing Updated!");
        res.redirect("/listings");
    }))

//delete route
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
});


module.exports = router;
