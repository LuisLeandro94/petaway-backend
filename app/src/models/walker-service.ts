import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IWalkerResourseAttributes {
	id?: number;

	walkerId: number;
	resourseId: number;
}

export default class WalkerResourse extends Model<IWalkerResourseAttributes> implements IWalkerResourseAttributes {
	id: number;

	walkerId: number;

	resourseId: number;
}
WalkerResourse.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		walkerId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		resourseId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'walker_resourses'
	}
);
