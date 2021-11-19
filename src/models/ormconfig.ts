import config from "../config";
import { ConnectionOptions } from "typeorm";

export = {
  type: "mariadb",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase,
  entities: [`${__dirname}/entity/*.ts`],
  migrations: [`${__dirname}/migration/*.ts`],
  subscribers: [`${__dirname}/subscriber/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/entity`,
    migrationsDir: `${__dirname}/migration`,
    subscribersDir: `${__dirname}/subscriber`,
  },
} as ConnectionOptions;
