const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//new route
router.get("/new", isLoggedIn,listingController.renderNewForm)

router.route("/")
.get(wrapAsync(listingController.index))
.post(validateListing,isLoggedIn,wrapAsync(listingController.createListing )
);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(validateListing,isLoggedIn,isOwner,  wrapAsync(listingController.updateLisitng))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deletelisting));


//edit route 
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing))

module.exports = router;