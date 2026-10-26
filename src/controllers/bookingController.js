import { randomUUID } from "node:crypto";
import bookings from "../data/bookings.js";
import {
  isNonEmptyString,
  isValidEmail,
  isValidDate,
} from "../utils/validation.js";

// Available meeting rooms
const resources = [
  "Meeting Room A",
  "Meeting Room B",
  "Meeting Room C",
];

// Meeting times: one-hour slots between 09:00 and 17:00
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

// GET /api/slots
// Returns available time slots for a resource and date.
export const getAvailableSlots = (req, res) => {
  const { date, resource } = req.query;

  if (!isValidDate(date)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid date in YYYY-MM-DD format.",
    });
  }

  if (!isNonEmptyString(resource) || !resources.includes(resource.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid meeting room.",
      availableResources: resources,
    });
  }

  const bookedTimes = bookings
    .filter(
      (booking) =>
        booking.date === date && booking.resource === resource.trim()
    )
    .map((booking) => booking.time);

  const availableSlots = timeSlots.filter(
    (time) => !bookedTimes.includes(time)
  );

  return res.status(200).json({
    success: true,
    date,
    resource: resource.trim(),
    availableSlots,
  });
};

// POST /api/bookings
// Creates a new booking after validating the request.
export const createBooking = (req, res) => {
  const { name, email, date, resource, time } = req.body;

  if (!isNonEmptyString(name)) {
    return res.status(400).json({
      success: false,
      message: "Please provide your full name.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (!isValidDate(date)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid date in YYYY-MM-DD format.",
    });
  }

  if (!isNonEmptyString(resource) || !resources.includes(resource.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid meeting room.",
      availableResources: resources,
    });
  }

  if (!timeSlots.includes(time)) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid one-hour time slot.",
      availableSlots: timeSlots,
    });
  }

  // Prevent bookings for dates that have already passed.
  const today = new Date().toISOString().slice(0, 10);

  if (date < today) {
    return res.status(400).json({
      success: false,
      message: "Bookings cannot be made for dates in the past.",
    });
  }

  // Check whether the selected room and time are already booked.
  const conflictingBooking = bookings.find(
    (booking) =>
      booking.date === date &&
      booking.resource === resource.trim() &&
      booking.time === time
  );

  if (conflictingBooking) {
    return res.status(409).json({
      success: false,
      message: "This time slot has already been booked.",
    });
  }

  const newBooking = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    date,
    resource: resource.trim(),
    time,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  return res.status(201).json({
    success: true,
    message: "Your meeting room has been booked successfully.",
    booking: newBooking,
  });
};

// GET /api/bookings/:date/:resource
// Returns confirmed bookings for a specific date and room.
export const getBookingsByDateAndResource = (req, res) => {
  const { date, resource } = req.params;

  if (!isValidDate(date)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid date in YYYY-MM-DD format.",
    });
  }

  if (!isNonEmptyString(resource) || !resources.includes(resource.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid meeting room.",
      availableResources: resources,
    });
  }

  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.date === date &&
      booking.resource === resource.trim() &&
      booking.status === "confirmed"
  );

  return res.status(200).json({
    success: true,
    date,
    resource: resource.trim(),
    total: confirmedBookings.length,
    bookings: confirmedBookings,
  });
};

// DELETE /api/bookings/:id
// Cancels a booking using its unique ID.
export const cancelBooking = (req, res) => {
  const { id } = req.params;

  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === id
  );

  if (bookingIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Booking not found.",
    });
  }

  const [cancelledBooking] = bookings.splice(bookingIndex, 1);

  return res.status(200).json({
    success: true,
    message: "Booking cancelled successfully.",
    booking: cancelledBooking,
  });
};