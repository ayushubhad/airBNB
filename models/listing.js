const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const listingSchema= new Schema({
    title:{type : String,
        required:true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1684182309189-a1384f3d7d4c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=aes-5m3v4GBB82o-unsplash.jpg",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1684182309189-a1384f3d7d4c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=aes-5m3v4GBB82o-unsplash.jpg" : v
        }
    } ,
    price: Number,
    location:String,
    country: String,

});

const Listing= mongoose.model("Listing", listingSchema);
module.exports = Listing;