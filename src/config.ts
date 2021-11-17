import dotenv from "dotenv";

const env = dotenv.config();
if (!env) throw new Error(".env file not exist");

export default {
  port: process.env.SERVER_PORT!,
  jwtSecret: process.env.JWT_SECRET!,

  dbHost: process.env.MARIADB_HOST!,
  dbPort: process.env.MARIADB_PORT! as unknown as number,
  dbUser: process.env.MARIADB_USERNAME!,
  dbPassword: process.env.MARIADB_PASSWORD!,
  dbDatabase: process.env.MARIADB_DATABASE!,
};
