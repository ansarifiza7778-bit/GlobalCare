const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    country: String,
    fee:Number,
    experience: Number,
    about:String,
});
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;