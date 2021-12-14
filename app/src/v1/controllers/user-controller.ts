import { Request, Response } from 'express';
import User from '~models/user';
import { ResponseHandler } from '~utils/middleware';
import { UserService } from '~v1/services';

export default class UserController {
	UserService: UserService;

	constructor() {
		this.UserService = new UserService();
	}

	getUserById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			console.log(User.associations.userData)
			const user = await this.UserService.getSingle([User.associations.userData], [{ id }], null, null);
			if (user) {
				res.status(200).json(new ResponseHandler(true, 200, user));
			} else {
				res.status(500).json(new ResponseHandler(false, 500, 'user not exist'));
			}
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	editUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password, firstName, lastName, postalCode } = req.body;
			const response = await this.UserService.signup(email, password, firstName, lastName, postalCode);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getAllUsers = async (req: Request, res: Response): Promise<void> => {};
}
