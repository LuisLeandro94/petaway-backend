import Service from './service';
import Walker from '~models/walker';
import { ErrorHandler } from '~utils/middleware';
import UserService from './user-service';

export default class WalkerController extends Service {
	UserService: UserService;
	constructor() {
		super(Walker);
		this.UserService = new UserService();
	}

	insertWalker = async (userId: number) => {
		try {
			if (!(await this.UserService.any({ id: userId }))) {
				throw new ErrorHandler('user does not exist', 500);
			}
			if (await this.any({ userId: userId })) {
				throw new ErrorHandler('user is already a walker', 500);
			}

			const newWalker = new Walker({
				userId: userId,
				isDeleted: false
			});
			await this.save(newWalker);

			return newWalker;
		} catch (error) {
			throw new ErrorHandler(error);
		}
	};
}
