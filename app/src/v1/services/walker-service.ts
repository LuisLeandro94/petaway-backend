import Service from './service';
import Walker from '~models/walker';
import { ErrorHandler } from '~utils/middleware';
import UserService from './user-service';
import WalkerPetService from './walker-pet-service';
import WalkerResource from '~models/walker-service';
import WalkerPet from '~models/walker-pet';
import WalkerResourceService from './walker-resource-service';
import ResourceService from './resource-service';
import PetService from './pet-service';
import { Op } from 'sequelize';

export default class WalkerService extends Service {
	UserService: UserService;
	WalkerPetService: WalkerPetService;
	WalkerResourceService: WalkerResourceService;
	ResourceService: ResourceService;
	PetService: PetService;

	constructor() {
		super(Walker);
		this.UserService = new UserService();
		this.WalkerPetService = new WalkerPetService();
		this.WalkerResourceService = new WalkerResourceService();
		this.ResourceService = new ResourceService();
		this.PetService = new PetService();
	}

	addOrUpdateWalker = async (userId: number, services: any[], pets: any[]) => {
		try {
			if (!(await this.ResourceService.any({ id: { [Op.in]: services } }))) {
				throw new ErrorHandler('service does not exist', 500);
			}

			if (!(await this.PetService.any({ id: { [Op.in]: pets } }))) {
				throw new ErrorHandler('pet does not exist', 500);
			}

			if (!(await this.UserService.any({ id: userId }))) {
				throw new ErrorHandler('user does not exist', 500);
			}
			let newWalker;

			if (!(await this.any({ userId: userId }))) {
				newWalker = new Walker({
					userId: userId,
					isDeleted: false
				});
				await this.save(newWalker);
			} else {
				newWalker = await this.getSingle(null, [{ userId: userId }], null, null);
			}

			await WalkerResource.destroy({
				where: {
					walkerId: newWalker.id
				}
			});
			await WalkerPet.destroy({
				where: {
					walkerId: newWalker.id
				}
			});

			await Promise.all(
				services.map(async (service) => {
					if (!(await this.ResourceService.any({ id: service }))) {
						throw new ErrorHandler('service does not exist', 500);
					}
					const newWalkerService = new WalkerResource({
						walkerId: newWalker.id,
						serviceId: service
					});
					await this.WalkerResourceService.save(newWalkerService);
				})
			);

			await Promise.all(
				pets.map(async (pet) => {
					if (!(await this.PetService.any({ id: pet }))) {
						throw new ErrorHandler('service does not exist', 500);
					}
					const newWalkerPet = new WalkerPet({
						walkerId: newWalker.id,
						petId: pet
					});
					await this.PetService.save(newWalkerPet);
				})
			);

			return newWalker;
		} catch (error) {
			throw new ErrorHandler(error);
		}
	};
}
