import { Request, Response } from 'express';
import User from '~models/user';
import { ResponseHandler } from '~utils/middleware';
import { UserDataService, UserService } from '~v1/services';
import { Op } from 'sequelize';

export default class UserController {
	UserService: UserService;
	UserDataService: UserDataService;

	constructor() {
		this.UserService = new UserService();
		this.UserDataService = new UserDataService();
	}

	getUserById = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = req.user_id;
			const user = await this.UserService.getSingle([User.associations.userData], [{ id: userId }], null, null);
			if (user) {
				res.status(200).json(new ResponseHandler(true, 200, user));
			} else {
				res.status(500).json(new ResponseHandler(false, 500, 'user does not exist'));
			}
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	editUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				firstName,
				lastName,
				address_1,
				address_2,
				city,
				state,
				zip,
				country,
				profilePhoto,
				birthdate,
				phoneNumber
			} = req.body;

			const userId = req.user_id;

			const user = await this.UserService.getSingle([User.associations.userData], [{ id: userId }], null, null);

			if (!user) res.status(500).json(new ResponseHandler(false, 500, 'user does not exist'));

			const userData = await this.UserDataService.getSingle(null, [{ userId: userId }], null, null);

			userData.firstName = firstName;
			userData.lastName = lastName;
			userData.address_1 = address_1;
			userData.address_2 = address_2;
			userData.city = city;
			userData.state = state;
			userData.zip = zip;
			userData.country = country;
			userData.profilePhoto = profilePhoto;
			userData.birthdate = birthdate;
			userData.phoneNumber = phoneNumber;

			await this.UserDataService.save(userData);
			user.userData = userData;
			res.status(201).json(new ResponseHandler(true, 201, user));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	editPassword = async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				password,
			} = req.body;

			const userId = req.user_id;

			const user = await this.UserService.getSingle([User.associations.userData], [{ id: userId }], null, null);

			if (!user) res.status(500).json(new ResponseHandler(false, 500, 'user does not exist'));

			user.password = password;

			await this.UserService.save(user);

			res.status(201).json(new ResponseHandler(true, 201, user));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	deleteUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = req.user_id;
			const response = await this.UserService.delete([{ id: userId }]);
			res.status(201).json(new ResponseHandler(true, 201, response));
		} catch (error) {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
