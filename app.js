const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const  mongo_URL= "mongodb://127.0.0.1:27017/Tourism";
const path = require("path");
app.use(express.urlencoded({ extended: true }));
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listing = require("./routes/listing.js");
const review = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");


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


app.use((req,res,next)=>
{
    res.locals.success = req.flash("success");
    next();

})

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




app.use("/listings", listing);
app.use("/listings/:id/reviews", review);



app.all("any", (req,res,next) => {
    next(new ExpressError(404, "Page Not found!"));
});

app.use((err,req,res,next) =>{
    let{statusCode=500, message= "Something went wrong!"}= err;
    res.status(statusCode).render("error.ejs", {err});
});

app.listen(8080, ()=>{
    console.log("the server is listening on port 8080");
});