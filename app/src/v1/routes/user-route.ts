import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { UserController } from '~v1/controllers';
import { USER_VALIDATOR } from '~v1/validators';

const UserRoute = Router();

UserRoute.get('/users/:id', new ParamsHandler().validateParams(USER_VALIDATOR.GET_BY_ID), new UserController().getUserById);
// UserRoute.get('/users/:id', new UserController().getUserById);

UserRoute.put('/users/:id', new ParamsHandler().validateParams(USER_VALIDATOR.EDIT), new UserController().editUser);
UserRoute.delete('/users/:id', new ParamsHandler().validateParams(USER_VALIDATOR.DELETE), new UserController().getAllUsers);

export default UserRoute ;
