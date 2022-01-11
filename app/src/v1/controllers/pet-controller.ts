import { Request, Response } from 'express';
import { ResponseHandler } from '~utils/middleware';
import { PetService } from '~v1/services';

export default class PetController {
	PetService: PetService;

	constructor() {
		this.PetService = new PetService();
	}

	getAllPets = async (req: Request, res: Response): Promise<void> => {
		try {
			console.log("here")
			const response = await this.PetService.get();
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getPetById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.query;
			const response = await this.PetService.getSingle(null, [{ id: id }], null, null);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
