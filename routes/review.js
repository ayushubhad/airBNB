const express= require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewcController = require("../controllers/reviews.js")

//post review route 
router.post("/",isLoggedIn, validateReview, wrapAsync( reviewcController.createReview))
//delete review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,  wrapAsync(reviewcController.destroyReview))

module.exports = router;