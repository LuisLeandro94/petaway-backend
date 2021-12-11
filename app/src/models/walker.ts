import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IWalkerAttributes {
	id?: number;

	userId: number;
}

export default class Walker extends Model<IWalkerAttributes> implements IWalkerAttributes {
	id: number;

	userId: number;
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
		}
	},
	{
		sequelize,
		tableName: 'walkers'
	}
);
