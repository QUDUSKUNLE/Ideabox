import dotenv from 'dotenv';

dotenv.config();

/**
 * @description This is database mongoose database configuration
 */
module.exports = {
  urlDevelopment: process.env.mongoDBLOCAL,
  urlProduction: process.env.mongoDBURL
};
