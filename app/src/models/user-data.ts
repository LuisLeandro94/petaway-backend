import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IUserDataAttributes {
	id?: number;

	userId: number;
	firstName?: string;
	lastName?: string;
	address_1?: string;
	address_2?: string;
	city?: string;
	state?: string;
	zip?: string;
	country?: string;
	profilePhoto?: string;
	birthdate?: string;
	phoneNumber?: string;
}

export default class UserData extends Model<IUserDataAttributes> implements IUserDataAttributes {
	id: number;

	userId: number;

	firstName?: string;

	lastName?: string;

	address_1?: string;

	address_2?: string;

	city?: string;

	state?: string;

	zip?: string;

	country?: string;

	profilePhoto?: string;

	birthdate?: string;

	phoneNumber?: string;
}
UserData.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zip: {
			type: DataTypes.STRING,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true
		},
		profilePhoto: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		birthdate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		tableName: 'users_data'
	}
);
