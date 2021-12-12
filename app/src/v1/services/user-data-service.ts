import Service from './service';
import UserData from '~models/user-data';
import { ErrorHandler } from '~utils/middleware';

export default class UserDataService extends Service {
	constructor() {
		super(UserData);
	}
}
