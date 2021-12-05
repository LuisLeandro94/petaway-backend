require('dotenv').config();

const {
  DB_HOST, DB_USER, DB_PASSWORD, DB, DB_PORT,
} = process.env;

module.exports = {
  development: {
    database: DB,
    dialect: 'postgres',
    host: DB_HOST,
    username: DB_USER,
    port: DB_PORT,
  },
};
