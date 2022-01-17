import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { EventController } from '~v1/controllers';
import { EVENT_VALIDATOR } from '~v1/validators';

const EventRoute = Router();

EventRoute.post(
	'/events',
	new ParamsHandler().validateParams(EVENT_VALIDATOR.ADD_EVENT),
	new EventController().addEvent
);
EventRoute.get(
	'/events/user',
	new EventController().getByUser
);
EventRoute.get(
	'/events/walker',
	new ParamsHandler().validateParams(EVENT_VALIDATOR.GET_EVENT),
	new EventController().getByWalker
);
EventRoute.put(
	'/events',
	new ParamsHandler().validateParams(EVENT_VALIDATOR.EDIT_EVENT),
	new EventController().updateEvent
);

export default EventRoute;
