const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

console.log(env)
const db: any = {};
const sequelize: any = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
	.filter((file: string) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
	.forEach((file: any) => {
		const model = path.join(__dirname, file);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

export { sequelize, Sequelize };
