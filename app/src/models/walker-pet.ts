import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

interface IWalkerPetAttributes {
	id?: number;

	walkerId: number;
	petId: number;
}

export default class WalkerPet extends Model<IWalkerPetAttributes> implements IWalkerPetAttributes {
	id: number;

	walkerId: number;

	petId: number;
}
WalkerPet.init(
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
		petId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'walker_pets'
	}
);
