import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import Service from './service';
import User from '~models/user';
import UserData from '~models/user-data';
import { ErrorHandler } from '~utils/middleware';
import { UserDataService } from '~v1/services';
import { RedisClient } from '../../config';

export default class UserService extends Service {
	UserDataService: UserDataService;

	constructor() {
		super(User);
		this.UserDataService = new UserDataService();
	}

	login = async (email: string, password: string) => {
		try {
			const user: User = await this.getSingle(null, [{ email, password }], null, null);

			if (!user) {
				throw new ErrorHandler('user not exist', 500);
			}
			const jwt_signature: string = uuidv4();

			const redisClient: RedisClient = new RedisClient();

			const jwtToken = jwt.sign({ userId: user.id }, jwt_signature, {
				expiresIn: '24h'
			});

			await redisClient.set(`user_${user.id}`, JSON.stringify({ jwt: jwtToken, jwt_signature }));

			this.save(user);

			return jwtToken;

		} catch (error) {
			throw new ErrorHandler(error);
		}
	};

	signup = async (email: string, password: string, firstName: string, lastName: string, postalCode: string) => {
		try {
			if (!(await this.any({ email }))) {
				const user: User = new User({
					email,
					password
				});
				await this.save(user);

				const userData = new UserData({
					userId: user.id,
					firstName,
					lastName,
					zip: postalCode
				});
				await this.UserDataService.save(userData);
				return user;
			}
			throw new ErrorHandler('Email already in use', 400);
		} catch (error) {
			throw new ErrorHandler(error);
		}
	};
}
