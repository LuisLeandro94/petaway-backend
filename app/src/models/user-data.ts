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
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address_2: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false
		},
		zip: {
			type: DataTypes.STRING,
			allowNull: false
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false
		},
		profilePhoto: {
			type: DataTypes.STRING,
			allowNull: false
		},
		birthdate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'users_data'
	}
);
