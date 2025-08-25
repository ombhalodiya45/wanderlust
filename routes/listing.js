const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer")
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });


const listingController = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(validateListing, isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing),
    );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search", async (req, res) => {
    try {
        const query = req.query.q?.trim(); // get and trim text
        if (!query) {
        return res.redirect("/listings"); // if empty, go back
        }

        // Search listings where title matches query (case-insensitive)
        const listings = await Listing.find({
        title: { $regex: query, $options: "i" }
        });

        res.render("listings/index.ejs", { allListings: listings, searchQuery: query });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
    });

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, listingController.destroyListing)

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

    

// ✅ Villa category route (add this **before module.exports**)
router.get("/category/villa", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Villa" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Villa listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Villa" });
}));

router.get("/category/Trending", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Trending" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Trending listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Trending" });
}));

router.get("/category/Hotels", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Hotels" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Hotels listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Hotels" });
}));

router.get("/category/Cities", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Cities" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Cities listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Cities" });
}));

router.get("/category/Mountains", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Mountains" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Mountains listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Mountains" });
}));

router.get("/category/Beaches", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Beaches" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Beaches listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Beaches" });
}));

router.get("/category/Camping", wrapAsync(async (req, res) => {
    const listings = await Listing.find({ category: "Camping" });

    if (!listings || listings.length === 0) {
        req.flash("error", "No Camping listings found");
        return res.redirect("/listings");
    }

    res.render("listings/category.ejs", { listings, category: "Camping" });
}));



module.exports = router;
