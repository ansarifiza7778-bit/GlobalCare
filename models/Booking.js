const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  patientName: String,
  date: String,
  time: String,
  doctorId: String,
  doctorName: String,
  specialty: String,
  fee: Number,
  userEmail: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;