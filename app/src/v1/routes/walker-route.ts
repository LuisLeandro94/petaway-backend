import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { WalkerController } from '~v1/controllers';
import { WALKER_VALIDATOR } from '~v1/validators';

const WalkerRoute = Router();

WalkerRoute.post(
	'/Walkers',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.ADD_WALKER),
	new WalkerController().addWalker
);
WalkerRoute.put(
	'/Walkers',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.ADD_WALKER),
	new WalkerController().updateWalker
);
WalkerRoute.get('/Walkers', new WalkerController().getAllWalkers);
WalkerRoute.get(
	'/Walkers/:id',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.GET_BY_ID),
	new WalkerController().getWalkerById
);
WalkerRoute.delete('/Walker', new WalkerController().deleteWalker);

export default WalkerRoute;
