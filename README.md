# ReserveSpace Backend

## Project Overview

ReserveSpace is a meeting room booking and reservation system developed as a full-stack software development project.

This repository contains the backend API built with Node.js and Express. It manages meeting room availability, creates reservations, retrieves confirmed bookings, and allows bookings to be cancelled.

The application uses an in-memory array for data storage, as specified in the project requirements. No database is required.

## Technologies Used

* Node.js
* Express.js
* JavaScript (ES Modules)
* REST API
* Postman
* CORS
* Helmet
* dotenv

## Features

* Retrieve available meeting room time slots.
* Create meeting room reservations.
* Validate booking information.
* Prevent double bookings for the same room, date, and time.
* Retrieve confirmed bookings by date and meeting room.
* Cancel reservations using unique booking IDs.
* Return appropriate HTTP status codes.
* Handle unknown routes and server errors.
* Configure the server using environment variables.

## Project Structure

booking-reservation-backend/
├── src/
│   ├── controllers/
│   │   └── bookingController.js
│   ├── data/
│   │   └── bookings.js
│   ├── routes/
│   │   └── bookingRoutes.js
│   ├── utils/
│   │   └── validation.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

## Installation

### Prerequisites

Install the following before running the project:

* Node.js version 20 or later
* npm
* Postman (for API testing)

### 1. Clone the repository

```bash
git clone https://github.com/bonolokeletsophasha-ai/booking-reservation-backend.git
```

### 2. Navigate to the project folder

```bash
cd booking-reservation-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory using `.env.example` as a reference.

Add the following configuration:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

The `PORT` variable specifies the backend port. `CLIENT_ORIGIN` specifies the local React frontend origin permitted by the CORS configuration.

### 5. Start the development server

```bash
npm run dev
```

The API should be available at:

`http://localhost:5000`

## API Endpoints

### 1. Health Check

**GET** `/api/health`

Checks whether the backend server is running.

### 2. Get Available Time Slots

**GET** `/api/slots?date=YYYY-MM-DD&resource=Meeting%20Room%20A`

Returns available time slots for the specified date and meeting room.

Example:

```text
http://localhost:5000/api/slots?date=2026-10-27&resource=Meeting%20Room%20A
```

### 3. Create a Booking

**POST** `/api/bookings`

Creates a new meeting room reservation.

Example request body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "date": "2026-10-27",
  "resource": "Meeting Room A",
  "time": "10:00"
}
```

A successful request returns the booking details, including a unique ID.

### 4. Get Bookings by Date and Resource

**GET** `/api/bookings/:date/:resource`

Returns confirmed bookings for the specified date and meeting room.

Example:

```text
http://localhost:5000/api/bookings/2026-10-27/Meeting%20Room%20A
```

### 5. Cancel a Booking

**DELETE** `/api/bookings/:id`

Cancels a reservation using its unique booking ID.

Replace `:id` with the ID returned when the booking was created.

## HTTP Status Codes

| Status Code | Description                    |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Booking created successfully   |
| 400         | Invalid request data           |
| 404         | Route or booking not found     |
| 409         | Booking conflict               |

## Data Storage

Bookings are stored in an in-memory JavaScript array.

This approach satisfies the project's requirement to use an array instead of a database. However, all bookings are lost when the backend server restarts.

## Security and Configuration

* Helmet adds security-related HTTP headers.
* CORS controls which frontend origin can access the API through browsers.
* dotenv loads environment variables from `.env`.
* `.gitignore` prevents local configuration and dependency folders from being committed.

The application is intended for educational use and is not yet configured for production deployment.

## Testing

The API endpoints can be tested using Postman.

Recommended tests include:

* Retrieving available time slots.
* Creating a valid booking.
* Rejecting invalid email addresses.
* Rejecting invalid meeting rooms and time slots.
* Preventing duplicate bookings.
* Retrieving confirmed reservations.
* Cancelling an existing booking.
* Confirming that a cancelled slot becomes available again.

## Future Improvements

* Build a responsive React and Tailwind CSS frontend.
* Add automated backend tests.
* Improve concurrency protection for simultaneous booking requests.
* Add authentication and authorisation if required.
* Consider persistent storage for a production version.

## Author

Developed as a software development project using React, Tailwind CSS, Node.js, and Express.
