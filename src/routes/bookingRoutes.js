import { Router } from "express";

import {
getAvailableSlots,
createBooking,
getBookingsByDateAndResource,
cancelBooking,
} from "../controllers/bookingController.js";

const router = Router();

router.get("/slots", getAvailableSlots);

router.post("/bookings", createBooking);

router.get("/bookings/:date/:resource", getBookingsByDateAndResource);

router.delete("/bookings/:id", cancelBooking);

export default router;
