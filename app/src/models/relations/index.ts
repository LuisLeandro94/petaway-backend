import Resource from '~models/resource';
import EventStatus from '~models/event-status';
import Event from '~models/event';
import User from '~models/user';
import Walker from '~models/walker';
import Pet from '~models/pet';
import UserData from '~models/user-data';

class Relations {
	defineRelations = () => {
		Event.hasOne(EventStatus, {
			foreignKey: 'eventId',
			as: 'Status'
		});
		Event.hasOne(User, {
			foreignKey: 'id',
			as: 'user'
		});
		Event.hasOne(Walker, {
			foreignKey: 'id',
			as: 'walker'
		});
		Event.hasOne(Resource, {
			foreignKey: 'id',
			as: 'resource'
		});
		Pet.belongsToMany(Walker, {
			through: 'walker_pets',
			as: 'walkers',
			foreignKey: 'petId'
		});
		Resource.belongsToMany(Walker, {
			through: 'walker_services',
			as: 'walkers',
			foreignKey: 'id'
		});
		UserData.belongsTo(User, {
			foreignKey: 'userId',
			as: 'user'
		});
		User.hasOne(UserData, {
			foreignKey: 'userId',
			as: 'userData'
		});
		Walker.belongsToMany(Pet, {
			through: 'walker_pets',
			as: 'pets',
			foreignKey: 'id'
		});
		Walker.belongsToMany(Resource, {
			through: 'walker_services',
			as: 'services',
			foreignKey: 'id'
		});
		Walker.belongsTo(User, {
			foreignKey: 'id',
			as: 'user'
		});

	
	};
}
export default Relations;
