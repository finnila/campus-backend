const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db");
const campusesRouter = require("./routes/campuses");
const studentsRouter = require("./routes/students");

// Add error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

console.log("Starting server initialization...");

const app = express();
const PORT = process.env.PORT || 3003;

// CORS configuration
app.use(cors()); // Allow all origins during development

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`\n=== Incoming Request ===`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.json({ message: "Server is running!" });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Routes
app.use("/api/campuses", campusesRouter);
app.use("/api/students", studentsRouter);

// 404 handler
app.use((req, res, next) => {
  console.log(`\n=== 404 Not Found ===`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start server
const startServer = async () => {
  try {
    console.log("\n=== Server Startup ===");
    console.log("1. Starting server...");

    // Sync database
    console.log("2. Attempting to sync database...");
    await sequelize.sync({ force: true });
    console.log("3. Database synced successfully!");

    // Run seed file
    console.log("4. Running seed file...");
    const seed = require("./seed");
    await seed();
    console.log("5. Seed completed!");

    // Create HTTP server
    console.log("6. Creating HTTP server...");
    const server = app.listen(PORT, "0.0.0.0", (error) => {
      if (error) {
        console.error("\n=== Server Error ===");
        console.error("❌ Failed to start server:", error);
        process.exit(1);
      }
      const address = server.address();
      console.log("\n=== Server Status ===");
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ Server address: ${address.address}:${address.port}`);
      console.log(`\nTry these URLs:`);
      console.log(`- http://localhost:${PORT}/api/test`);
      console.log(`- http://localhost:${PORT}/api/campuses`);
      console.log(`- http://localhost:${PORT}/api/students`);
    });

    // Add error handler for the server
    server.on("error", (error) => {
      console.error("\n=== Server Error ===");
      if (error.code === "EADDRINUSE") {
        console.error(
          `❌ Port ${PORT} is already in use. Please try a different port.`
        );
        console.log("\nTry these steps:");
        console.log("1. Find the process using port 3001:");
        console.log("   - Open PowerShell as Administrator");
        console.log("   - Run: netstat -ano | findstr :3001");
        console.log("2. Kill the process:");
        console.log("   - Run: taskkill /PID <PID> /F");
        console.log("   (Replace <PID> with the process ID from step 1)");
      } else {
        console.error("❌ Server error:", error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("\n=== Fatal Error ===");
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

// Start the server
console.log("Calling startServer...");
startServer();
