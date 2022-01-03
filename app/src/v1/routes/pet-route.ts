import { Router } from 'express';
import { ParamsHandler } from '~utils/middleware';
import { PetController } from '~v1/controllers';
import { PET_VALIDATOR } from '~v1/validators';

const PetRoute = Router();

PetRoute.get('/pet', new PetController().getAllPets);
PetRoute.get(
	'/pet/:id',
	new ParamsHandler().validateParams(PET_VALIDATOR.GET_BY_ID),
	new PetController().getPetById
);

export default PetRoute;
