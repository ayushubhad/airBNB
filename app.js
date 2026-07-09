const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const  mongo_URL= "mongodb://127.0.0.1:27017/Tourism";
const path = require("path");
app.use(express.urlencoded({ extended: true }));
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const sessionOptions = 
{
    secret : "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    },

}


app.get("/", (req,res)=>{
    res.send("HI i am root");
});


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>
{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();

})

/*
app.get("/demouser", async (req, res) => {
    try {
        const fakeUser = new User({
            email: "student@gmail.com",
            username: "demouser"
        });

      
        const registeredUser = await User.register(fakeUser, "helloworld123");
        
        
        res.send(registeredUser); 

    } catch (err) {
        res.send("Error: " + err.message);
    }
});
*/

main().then(()=>{console.log("connected to DB")})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(mongo_URL);
   
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "/public")));




app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all(/(.*)/ ,(req,res,next) => {
    next(new ExpressError(404, "Page Not found!"));
});

app.use((err,req,res,next) =>{
    let{statusCode=500, message= "Something went wrong!"}= err;
    res.status(statusCode).render("error.ejs", {err});
});

app.listen(8080, ()=>{
    console.log("the server is listening on port 8080");
});