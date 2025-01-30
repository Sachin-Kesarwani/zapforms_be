// cronService.js
const cron = require("node-cron");
const { convertMinuteInseconds } = require("../utils");
const { otpModel } = require("../models/otpModel");

// Creating a cron job which runs every 10 seconds
const startCronJob = () => {
  cron.schedule("*/15 * * * *", async () => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const expiryTime = convertMinuteInseconds(15);
    const result = await otpModel.deleteMany({
      createdAt: { $lte: currentTimeInSeconds - expiryTime },
    });
    console.log(`Deleted ${result.deletedCount}  expired OTP(s).`);
  });
};

// Exporting the function to start the cron job
module.exports = startCronJob;
