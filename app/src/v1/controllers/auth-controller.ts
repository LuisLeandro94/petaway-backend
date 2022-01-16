import { Request, Response } from 'express';
import { ResponseHandler } from '~utils/middleware';
import { UserService } from '~v1/services';

export default class AuthController {
	UserService: UserService;

	constructor() {
		this.UserService = new UserService();
	}

	login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password } = req.body;
			const response = await this.UserService.login(email, password);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) /* istanbul ignore next */  {
			res.status(500).json(new ResponseHandler(false, 500, error.message));
		}
	};

	signup = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password, firstName, lastName, postalCode } = req.body;
			const response = await this.UserService.signup(email, password, firstName, lastName, postalCode);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	forgetPassword = () => {};
}
