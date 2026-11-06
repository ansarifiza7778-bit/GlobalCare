const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("./models/Doctor");

const doctors = [
  {
    name: "Dr. Ananya Rao",
    specialty: "Cardiology",
    country: "India",
    fee: 40,
    experience: 14,
    about: "Heart specialist with 14 years of experience.",
  },
  {
    name: "Dr. James Carter",
    specialty: "Dermatology",
    country: "US",
    fee: 70,
    experience: 9,
    about: "Specialist in skin and hair problems.",
  },
  {
    name: "Dr. Layla Haddad",
    specialty: "Pediatrics",
    country: "UAE",
    fee: 55,
    experience: 11,
    about: "Child specialist with 11 years of experience.",
  },
  {
    name: "Dr. Mei Tanaka",
    specialty: "Neurology",
    country: "Japan",
    fee: 90,
    experience: 16,
    about: "Specialist in brain and nerve disorders.",
  },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log("Doctors added successfully");
  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedData();