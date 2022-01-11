import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { ResourceController } from '~v1/controllers';
import { RESOURCE_VALIDATOR } from '~v1/validators';

const ResourceRoute = Router();

ResourceRoute.get('/services', new ResourceController().getAllResources);
ResourceRoute.get(
	'/services/:id',
	new ParamsHandler().validateParams(RESOURCE_VALIDATOR.GET_BY_ID),
	new ResourceController().getResourceById
);

export default ResourceRoute;
