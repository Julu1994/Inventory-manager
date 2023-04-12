import dotenv from 'dotenv';
dotenv.config();

export const config = {
  DB_LINK: process.env.DB_LINK,
  SE_KEY: process.env.SE_KEY,
};
