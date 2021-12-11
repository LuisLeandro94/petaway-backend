import { AuthService } from '~v1/services/index.js';

export default class AuthController  {
  AuthService;
  constructor(){
    AuthService = new AuthService();
  }

  login = () => {
    console.log('here')
  }
}

