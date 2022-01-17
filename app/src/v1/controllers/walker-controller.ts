import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Pet from '~models/pet';
import Resource from '~models/resource';
import User from '~models/user';
import UserData from '~models/user-data';
import Walker from '~models/walker';
import { ErrorHandler, ResponseHandler } from '~utils/middleware';
import { WalkerService } from '~v1/services';

export default class WalkerController {
	WalkerService: WalkerService;

	constructor() {
		this.WalkerService = new WalkerService();
	}

	addWalker = async (req: Request, res: Response): Promise<void> => {
		try {
			const { services, pets } = req.body;
			const userId = req.user_id;
			if (await this.WalkerService.any({ userId: userId })) {
				throw new ErrorHandler('user already is a walker', 500);
			}
			const response = await this.WalkerService.addOrUpdateWalker(userId, services, pets);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
	updateWalker = async (req: Request, res: Response): Promise<void> => {
		try {
			const { services, pets } = req.body;
			const userId = req.user_id;
			if (!(await this.WalkerService.any({ userId: userId }))) {
				throw new ErrorHandler('user is not a walker', 500);
			}
			const response = await this.WalkerService.addOrUpdateWalker(userId, services, pets);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	deleteWalker = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = req.user_id;
			if (!(await this.WalkerService.any({ userId: userId }))) {
				throw new ErrorHandler('user is not a walker', 500);
			}
			const walker = await this.WalkerService.delete([{ userId: userId }]);
			res.status(201).json(new ResponseHandler(true, 201, walker));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getAllWalkers = async (req: Request, res: Response): Promise<void> => {
		try {
			const { services, pets, city } = req.query;
			const response = await this.WalkerService.get(null, null, null, null, [
				{
					model: Resource,
					as: 'services',
					where: { id: { [Op.in]: JSON.parse(services.toString()) } }
				},
				{
					model: Pet,
					as: 'pets',
					where: { id: { [Op.in]: JSON.parse(pets.toString()) } }
				},
				{
					model: User,
					as: 'user',
					include: {
						model: UserData,
						as: 'userData',
						where: { city: city }
					},
					where: {
						id: {
							[Op.not]: null
						}
					}
				}
			]);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getWalkerById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.query;
			const response = await this.WalkerService.getSingle(null, [{ id: id }], null, null);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
