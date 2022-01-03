import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { WalkerController } from '~v1/controllers';
import { WALKER_VALIDATOR } from '~v1/validators';

const WalkerRoute = Router();

WalkerRoute.get('/Walker', new WalkerController().getAllWalkers);
WalkerRoute.get(
	'/Walker/:id',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.GET_BY_ID),
	new WalkerController().getWalkerById
);

export default WalkerRoute;
