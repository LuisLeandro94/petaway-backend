import { AuthService } from '~v1/services';

export default class AuthController {
	AuthService: AuthService;
	constructor() {
		this.AuthService = new AuthService();
	}

	login = () => {};

	signup = () => {};

	forgetPassword = () => {};
}
