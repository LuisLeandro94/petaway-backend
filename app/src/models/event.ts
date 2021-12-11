import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IEventAttributes {
	id?: number;
	userId: number;

	walkerId: number;
	resourseId: number;
	petId: string;
	status: number;
	date: Date;
}

export default class Event extends Model<IEventAttributes> implements IEventAttributes {
	id: number;
	userId: number;

	walkerId: number;
	resourseId: number;
	petId: string;
	status: number;
	date: Date;
}
Event.init(
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
		walkerId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		resourseId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		petId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'events'
	}
);
