import dotenv from 'dotenv';

dotenv.config();

/**
 * @description This is database mongoose database configuration
 */
module.exports = {
  ideaboxProduction: process.env.ideaboxProduction,
  ideabox: process.env.ideabox,
  ideaboxTest: process.env.ideaboxTest
};

