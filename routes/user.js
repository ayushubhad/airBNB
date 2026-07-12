const express= require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../models/user.js");
const { signup, renderSignup, Login, renderSignupForm, renderLoginForm, Logout } = require("../controllers/users.js");

router.route("/signup")
.get( renderSignupForm )
.post( wrapAsync(signup));

router.route("/login")
.get(renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect : "/login", failureFlash: "Invalid Username or Password!"}), Login);

router.get("/logout", Logout)

module.exports = router;