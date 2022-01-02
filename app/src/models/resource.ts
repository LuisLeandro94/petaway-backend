import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IResourceAttributes {
	id?: number;

	type: string;
}

export default class Resource extends Model<IResourceAttributes> implements IResourceAttributes {
	id: number;

	type: string;
}
Resource.init(
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
		tableName: 'resources'
	}
);
