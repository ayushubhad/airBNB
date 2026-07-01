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

app.get("/", (req,res)=>{
    res.send("HI i am root");
});

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