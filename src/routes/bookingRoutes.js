import {Router} from "express";

import{
    getAvailableSlots,
    createBooking,
    getBookingsByDateAndResource,
    cancelBooking,
} from "../controllers/bookingController.js";

const router = Router()

//Get available time slot for a specific date and resource
router.get("/slots", getAvailableSlots);

//Create a new booking
router.post("/bookings", createBooking);

//Get confirmed bookings for a specific date and resource
router.get("/bookings//", getBookingsByDateAndResource);

//Cancel a booking using is unique ID
router.delete("/bookings/", cancelBooking);

export default router;