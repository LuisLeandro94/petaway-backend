import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IResourseAttributes {
	id?: number;

	type: string;
}

export default class Resourse extends Model<IResourseAttributes> implements IResourseAttributes {
	id: number;

	type: string;
}
Resourse.init(
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
		tableName: 'resourses'
	}
);
