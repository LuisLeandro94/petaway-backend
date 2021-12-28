import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { AuthController } from '~v1/controllers';
import { AUTH_VALIDATOR } from '~v1/validators';

const AuthRoute = Router();

AuthRoute.post('/auth', new ParamsHandler().validateParams(AUTH_VALIDATOR.LOGIN), new AuthController().login);
AuthRoute.post('/auth/signup', new ParamsHandler().validateParams(AUTH_VALIDATOR.SIGNUP), new AuthController().signup);
AuthRoute.put('/auth', new AuthController().forgetPassword);

export default AuthRoute;
