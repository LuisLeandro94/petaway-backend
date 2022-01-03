import { Request, Response } from 'express';
import { ResponseHandler } from '~utils/middleware';
import { ResourceService } from '~v1/services';

export default class ResourceController {
	ResourceService: ResourceService;

	constructor() {
		this.ResourceService = new ResourceService();
	}

	getAllResources = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await this.ResourceService.get();
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getResourceById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.query;
			const response = await this.ResourceService.getSingle(null, [{ id: id }], null, null);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
