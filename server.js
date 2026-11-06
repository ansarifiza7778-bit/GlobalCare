const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// Import all models
const Doctor = require("./models/Doctor");
const Booking = require("./models/Booking");
const Review = require("./models/Review");
const User = require("./models/User");

const app = express();

// Middlewares: allow frontend requests and read JSON body
app.use(cors());
app.use(express.json());

// Basic test routes
app.get("/", (req, res) => {
  res.send("Globalcare backend is running");
});

app.get("/about", (req, res) => {
  res.send("Globalcare is a doctor appointment platform");
});

// Get all doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get a single doctor by id
app.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Create a new booking
app.post("/bookings", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get the bookings of one user (email comes from the URL)
app.get("/bookings/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Create a new review
app.post("/reviews", async (req, res) => {
  try {
    // This log shows exactly what the frontend sent
    console.log("Review received:", req.body);

    const body = req.body;

    // Frontend sends "rating", but the model field is "ratting"
    const ratingValue = body.ratting !== undefined ? body.ratting : body.rating;

    // Match the frontend field names with the Review model field names
    const reviewData = {
      doctorId: body.doctorId,
      patientName: body.patientName || body.name || body.userName,
      ratting: ratingValue !== undefined ? Number(ratingValue) : undefined,
      comment: body.comment,
    };

    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (err) {
    console.log("Review error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all reviews of one doctor (doctorId comes from the URL)
app.get("/reviews/:doctorId", async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Register route: creates a new user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // First check if this email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password (10 = how strong the hash is)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user in MongoDB
    const user = await User.create({ name, email, password: hashedPassword });

    // Do not send the password back, only the other details
    res.status(201).json({
      message: "Registered successfully",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log("Register error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login route: checks email and password
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the typed password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Login successful: send user details (never send the password)
    res.json({
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log("Login error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const PORT = 5000;

// Connect to MongoDB first, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });