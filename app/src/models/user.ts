import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserData from './user-data';

interface IUserAttributes {
	id?: number;

	email: string;

	password: string;

	isDeleted?: boolean;
}

export default class User extends Model<IUserAttributes> implements IUserAttributes {
	id?: number;

	email: string;

	password: string;

	isDeleted?: boolean;
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
		isDeleted: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	},
	{
		sequelize,
		tableName: 'users'
	}
);
