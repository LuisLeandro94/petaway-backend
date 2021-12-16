import { Console } from 'console';
import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { UserController } from '~v1/controllers';
import { USER_VALIDATOR } from '~v1/validators';

const UserRoute = Router();

UserRoute.get('/users', new UserController().getUserById);
UserRoute.put('/users', new ParamsHandler().validateParams(USER_VALIDATOR.EDIT), new UserController().editUser);
UserRoute.delete('/users', new UserController().deleteUser);

export default UserRoute;
