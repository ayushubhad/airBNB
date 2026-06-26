const { date } = require("joi");
const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const newSchema= new Schema({
    comment : string,
    rating:{
        type: number,
        min=1,
        max=5
    },
    createdAt:({
        type: date,
        default: date.now()
    })
})

model.exports= mongoose.model("Review", reviewSchema);