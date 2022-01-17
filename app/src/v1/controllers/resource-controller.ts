import { Request, Response } from 'express';
import { ErrorHandler, ResponseHandler } from '~utils/middleware';
import { ResourceService } from '~v1/services';

export default class ResourceController {
	ResourceService: ResourceService;

	constructor() {
		this.ResourceService = new ResourceService();
	}

	getAllResources = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await this.ResourceService.get();
			res.status(200).json(new ResponseHandler(true, 200, response));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getResourceById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.query;
			const response = await this.ResourceService.getSingle(null, [{ id }], null, null);
			if (!response) throw new ErrorHandler("Service dosen't exist",400);
			res.status(200).json(new ResponseHandler(true, 200, response));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
