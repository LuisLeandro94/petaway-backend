import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IWalkerAttributes {
	id?: number;

	userId: number;

	isDeleted?: boolean;
}

export default class Walker extends Model<IWalkerAttributes> implements IWalkerAttributes {
	id?: number;

	userId: number;

	isDeleted?: boolean;
}
Walker.init(
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
		isDeleted: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
	},
	{
		sequelize,
		tableName: 'walkers'
	}
);
