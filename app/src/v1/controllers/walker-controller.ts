import { Request, Response } from 'express';
import { ResponseHandler } from '~utils/middleware';
import { WalkerService } from '~v1/services';

export default class WalkerController {
	WalkerService: WalkerService;

	constructor() {
		this.WalkerService = new WalkerService();
	}

	addWalker = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = req.user_id;

			const response = await this.WalkerService.get();
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getAllWalkers = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await this.WalkerService.get();
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
