import { Router } from 'express';
import { AuthController } from '~v1/controllers/index.js';

const AuthRoute = Router();

AuthRoute.get('/login', AuthController.login);

export {AuthRoute} ;
