const mongoose = require ("mongoose");


const reviewSchema = new mongoose.Schema({
    doctorId: String,
    patientName: String,
    ratting : Number,
    comment: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

