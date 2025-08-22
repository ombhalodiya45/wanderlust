const Listing = require("../models/listing.js");
const axios = require("axios");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find();
    req.flash("success", "New Listing Created!");
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing You Requested Does Not Exist");
        return res.redirect("/listings");
    }
    console.log(listing.owner);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    const defaultUrl =
        "https://plus.unsplash.com/premium_photo-1749903201646-09435fb2b384?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const listingData = req.body.listing;

    const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        { params: { q: `${listingData.location},${listingData.country}`, format: "json", limit: 1 } }
    );

    const geoData = geoRes.data;

    if (geoData.length > 0) {
        listingData.lat = geoData[0].lat;
        listingData.lng = geoData[0].lon;
    }

    // If image is a string (user sent just a URL), convert it to object
    if (typeof listingData.image === "string") {
        listingData.image = { url: listingData.image };
    }

    // If image is missing, set default
    if (typeof listingData.image !== "object" || !listingData.image.url || listingData.image.url.trim() === "") {
        listingData.image = { url: defaultUrl };
    }

    if (!req.body.listing) {
        throw next(new ExpressError(404, "Page Not Found!"));
    }


    // Create new listing
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;
    if (req.file) {
        newListing.image = { url: req.file.path, filename: req.file.filename };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    return res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing You Requested Does Not Exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const updatedData = req.body.listing;

    const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        { params: { q: `${updatedData.location},${updatedData.country}`, format: "json", limit: 1 } }
    );

    const geoData = geoRes.data;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (geoData.length > 0) {
        updatedData.lat = geoData[0].lat;
        updatedData.lng = geoData[0].lon;
    }

    listing.set(updatedData);

    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
        
    }
    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};
