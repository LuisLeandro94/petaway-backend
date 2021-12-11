import Service from './service';
import User from '~models/user.js';

export default class AuthService extends Service {
	constructor() {
		super(User);
	}

	login = () => {};

	signup = () => {};

	forgetPassword = () => {};
}
