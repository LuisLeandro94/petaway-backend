import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserData from './user-data';

interface IUserAttributes {
	id?: number;

	email: string;

	password: string;

	jwt?: string;
}

export default class User extends Model<IUserAttributes> implements IUserAttributes {
	id: number;

	email: string;

	password: string;

	jwt: string;

	public userData?: UserData;
}
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		jwt: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		tableName: 'users'
	}
);
