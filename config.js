import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  secret: process.env.SECRET,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
};
