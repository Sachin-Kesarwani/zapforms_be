
// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const connectDB = require('./connection'); // Import the MongoDB connection
const cors = require("cors");
const cluster = require('cluster');
const os = require('os');
const authRouter = require('./routes/authRoute');
const cron = require("node-cron");
const startCronJob = require('./services/cron.service');
const { createformRouter } = require('./routes/formRoute');

// Get the number of CPU cores
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Master process logic
  console.log(`Master process started. Forking ${numCPUs} workers...`);
  // Fork a worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit and replace the worker
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new worker...`);
    cluster.fork();
  });
  process.on('SIGINT', () => {
    console.log('Shutting down master...' );
    for (const id in cluster.workers) {
      cluster.workers[id].kill();
    }
    process.exit(0);
  });
 
} else {
  // Worker process logic
  const app = express();

  // Middleware

  app.use(express.json()); // Parse incoming JSON requests
  app.use(cors()); // Enable CORS for all routes

  app.get('/', (req , res)=>{
    res.send("hello world")
  });
    // Basic route for server health check
  app.use("/auth",authRouter)
  app.use("/form",createformRouter)
  
  // Start the server for each worker
  const PORT = process.env.PORT || 5000;

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    console.log(`Worker ${process.pid} shutting down...`);
    process.exit(0);
  });
  app.listen(PORT, () => {
    connectDB();
    startCronJob()
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}
