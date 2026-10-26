import { Router } from "express";

import {
getAvailableSlots,
createBooking,
getBookingsByDateAndResource,
cancelBooking,
} from "../controllers/bookingController.js";

const router = Router();

// Get available time slots for a specific date and resource
router.get("/slots", getAvailableSlots);

// Create a new booking
router.post("/bookings", createBooking);

// Get confirmed bookings for a specific date and resource
router.get("/bookings/:date/:resource", getBookingsByDateAndResource);

// Cancel a booking using its unique ID
router.delete("/bookings/:id", cancelBooking);

export default router;

