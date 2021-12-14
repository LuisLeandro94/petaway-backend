import Resourse from '~models/resourse';
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
			foreignKey: 'walkerId',
			as: 'walker'
		});
		Event.hasOne(Resourse, {
			foreignKey: 'resourseId',
			as: 'resourse'
		});
		Pet.belongsToMany(Walker, {
			through: 'walker_pets',
			as: 'walkers',
			foreignKey: 'petId'
		});
		Resourse.belongsToMany(Walker, {
			through: 'walker_services',
			as: 'walkers',
			foreignKey: 'resourseId'
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
			foreignKey: 'walkerId'
		});
		Walker.belongsToMany(Resourse, {
			through: 'walker_services',
			as: 'services',
			foreignKey: 'walkerId'
		});
		Walker.belongsTo(User, {
			foreignKey: 'id',
			as: 'user'
		});

	
	};
}
export default Relations;
