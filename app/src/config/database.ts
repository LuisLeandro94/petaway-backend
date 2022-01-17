require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME_DEV, DB_NAME_PROD, DB_PORT } = process.env;

module.exports = {
	development: {
		database: process.env.DB_NAME_DEV,
		host: process.env.DB_HOST_DEV,
		username: process.env.DB_USER,
		port: process.env.DB_PORT_DEV,
		dialect: 'postgres',
		logging: false
	},
	production: {
		database: process.env.DB_NAME_PROD,
		host: process.env.DB_HOST_PROD,
		username: process.env.DB_USER,
		port: process.env.DB_PORT_PROD,
		dialect: 'postgres',
		logging: false
	}
};
