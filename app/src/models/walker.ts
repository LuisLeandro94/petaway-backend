import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import Pet from './pet';
import Resource from './resource';

interface IWalkerAttributes {
	id?: number;

	userId: number;

	isDeleted?: boolean;
}

export default class Walker extends Model<IWalkerAttributes> implements IWalkerAttributes {
	id?: number;

	userId: number;

	isDeleted?: boolean;

	public readonly services?: Resource;

	public readonly pets?: Pet;

	public readonly associations: {
		services: Association<Resource, Walker>;
		pets: Association<Pet, Walker>;
	};
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
		}
	},
	{
		sequelize,
		tableName: 'walkers'
	}
);
