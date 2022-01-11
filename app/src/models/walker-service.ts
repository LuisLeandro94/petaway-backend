import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IWalkerResourceAttributes {
	id?: number;

	walkerId: number;
	serviceId: number;
}

export default class WalkerResource extends Model<IWalkerResourceAttributes> implements IWalkerResourceAttributes {
	id: number;

	walkerId: number;

	serviceId: number;
}
WalkerResource.init(
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
		serviceId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'walker_services'
	}
);
