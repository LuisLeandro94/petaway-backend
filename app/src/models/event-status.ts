import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IEventStatusAttributes {
	id?: number;

	status: string;
}

export default class EventStatus extends Model<IEventStatusAttributes> implements IEventStatusAttributes {
	id: number;

	status: string;
}
EventStatus.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'event_status'
	}
);
