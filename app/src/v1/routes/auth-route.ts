import { Router } from 'express';
import { AuthController } from '~v1/controllers';

const AuthRoute = Router();

AuthRoute.post('/auth', new AuthController().login);
AuthRoute.post('/auth/signup', new AuthController().signup);
AuthRoute.put('/auth', new AuthController().forgetPassword);

export { AuthRoute };
