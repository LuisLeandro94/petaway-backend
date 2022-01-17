import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { WalkerController } from '~v1/controllers';
import { WALKER_VALIDATOR } from '~v1/validators';

const WalkerRoute = Router();

WalkerRoute.post(
	'/walkers',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.ADD_WALKER),
	new WalkerController().addWalker
);
WalkerRoute.put(
	'/walkers',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.ADD_WALKER),
	new WalkerController().updateWalker
);
WalkerRoute.get(
	'/walkers',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.GET_ALL_WALKER),
	new WalkerController().getAllWalkers
);
WalkerRoute.get(
	'/walkers/:userId',
	new ParamsHandler().validateParams(WALKER_VALIDATOR.GET_BY_ID),
	new WalkerController().getWalkerById
);
WalkerRoute.delete('/walkers', new WalkerController().deleteWalker);

export default WalkerRoute;
