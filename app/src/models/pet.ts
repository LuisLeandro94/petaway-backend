import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IPetAttributes {
	id?: number;

	type: string;
}

export default class Pet extends Model<IPetAttributes> implements IPetAttributes {
	id: number;

	type: string;
}
Pet.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'pets'
	}
);
