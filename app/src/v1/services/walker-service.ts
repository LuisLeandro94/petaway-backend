import Service from './service';
import Walker from '~models/walker';
import { ErrorHandler } from '~utils/middleware';
import UserService from './user-service';

export default class PetController extends Service {
	UserService: UserService;
	constructor() {
		super(Walker);
	}

	insertWalker = async (userId: number) => {
		try {
			if (!(await this.UserService.any({ id: userId }))) {
				throw new ErrorHandler('user does not exist', 500);
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
