import { Request, Response } from 'express';
import { ErrorHandler, ResponseHandler } from '~utils/middleware';
import { PetService } from '~v1/services';

export default class PetController {
	PetService: PetService;

	constructor() {
		this.PetService = new PetService();
	}

	getAllPets = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await this.PetService.get();
			res.status(200).json(new ResponseHandler(true, 200, response));
		} catch (error) /* istanbul ignore next */ {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getPetById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.query;
			const response = await this.PetService.getSingle(null, [{ id: id }], null, null);
			if (!response) throw new ErrorHandler("Pet dosen't exist", 400);
			res.status(200).json(new ResponseHandler(true, 200, response));
		} catch (error) /* istanbul ignore next */ {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
