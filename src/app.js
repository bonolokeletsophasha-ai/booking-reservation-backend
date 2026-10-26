import express from "express";
import cors from "cors";
import helmet from "helmet";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(helmet());

app.use(
cors({
origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
})
);

app.use(express.json({ limit: "10kb" }));

// API health check
app.get("/api/health", (req, res) => {
res.status(200).json({
success: true,
message: "ReserveSpace API is running successfully.",
});
});

// Booking API routes
app.use("/api", bookingRoutes);

// Handle unknown routes
app.use((req, res) => {
res.status(404).json({
success: false,
message: `Route not found: ${req.method} ${req.originalUrl}`,
});
});

// Centralised error handler
app.use((err, req, res, next) => {
console.error(err);

res.status(err.status || 500).json({
success: false,
message: err.status
? err.message
: "An unexpected server error occurred.",
});
});

export default app;