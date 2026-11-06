# GlobalCare International - Backend

REST API for **GlobalCare International**, a doctor appointment platform where patients can find doctors, book appointments, leave reviews and see their own bookings.

Frontend repository: https://github.com/ansarifiza7778-bit/globalcare-website

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs (password hashing)
- cors and dotenv

## Features

- Register and login with hashed passwords
- List all doctors and get a single doctor
- Create and view appointment bookings
- Get the bookings of one logged-in user
- Create reviews and get the reviews of one doctor

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/doctors` | Get all doctors |
| GET | `/doctors/:id` | Get one doctor by id |
| POST | `/bookings` | Create a new booking |
| GET | `/bookings` | Get all bookings |
| GET | `/bookings/user/:email` | Get the bookings of one user |
| POST | `/reviews` | Create a new review |
| GET | `/reviews` | Get all reviews |
| GET | `/reviews/:doctorId` | Get the reviews of one doctor |
| POST | `/register` | Register a new user |
| POST | `/login` | Login a user |

## Project Structure

```
global care-backend
├── models
│   ├── Booking.js
│   ├── Doctor.js
│   ├── Review.js
│   └── User.js
├── seed.js
├── server.js
└── package.json
```

## How to Run Locally

1. Clone the repository and open the folder.
2. Install the packages:

```
npm install
```

3. Create a `.env` file in the project folder and add your MongoDB connection string:

```
MONGO_URI=your_mongodb_connection_string
```

4. (Optional) Add the sample doctors to the database:

```
node seed.js
```

5. Start the server:

```
node server.js
```

The server runs on `http://localhost:5000`.

## Author

Fiza Ansari