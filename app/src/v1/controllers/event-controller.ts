import { Request, Response } from 'express';
import { ErrorHandler, ResponseHandler } from '~utils/middleware';
import { EventStatus } from '~utils/enums';

import {
	EventService,
	PetService,
	ResourceService,
	UserService,
	WalkerService,
	WalkerPetService,
	WalkerResourceService
} from '~v1/services';
import Event from '~models/event';

export default class EventController {
	EventService: EventService;
	WalkerService: WalkerService;
	UserService: UserService;
	WalkerPetService: WalkerPetService;
	WalkerResourceService: WalkerResourceService;
	ResourceService: ResourceService;
	PetService: PetService;

	constructor() {
		this.EventService = new EventService();
		this.WalkerService = new WalkerService();
		this.UserService = new UserService();
		this.WalkerPetService = new WalkerPetService();
		this.WalkerResourceService = new WalkerResourceService();
		this.ResourceService = new ResourceService();
		this.PetService = new PetService();
	}

	addEvent = async (req: Request, res: Response): Promise<void> => {
		try {
			const { walkerId, serviceId, petId, date } = req.body;
			const userId = req.user_id;

			if (!(await this.WalkerService.any({ id: walkerId }))) {
				throw new ErrorHandler('Walker does not exist', 400);
			}
			if (!(await this.WalkerPetService.any({ walkerId: walkerId, petId: petId }))) {
				throw new ErrorHandler('Walker does not have this pet', 400);
			}
			if (!(await this.WalkerResourceService.any({ walkerId: walkerId, serviceId: serviceId }))) {
				throw new ErrorHandler('Walker does not have this service', 400);
			}
			const event = new Event({
				userId: userId,
				walkerId: walkerId,
				resourceId: serviceId,
				petId: petId,
				date: date,
				status: EventStatus.Created as number
			});
			await this.EventService.save(event);
			res.status(201).json(new ResponseHandler(true, 201, event));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getByUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = req.user_id;
			const response = await this.EventService.get(null, null, null, null, null, { userId });
			res.status(200).json(new ResponseHandler(true, 200, response));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getByWalker = async (req: Request, res: Response): Promise<void> => {
		try {
			const { walkerId } = req.query;

			const response = await this.EventService.get(null, null, null, null, null, { walkerId });

			res.status(200).json(new ResponseHandler(true, 200, response));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	updateEvent = async (req: Request, res: Response): Promise<void> => {
		try {
			const { eventId, status } = req.body;

			const event = await this.EventService.getSingle(null, { id: eventId });

			if (!event) {
				throw new ErrorHandler('Event does not exist', 400);
			}

			event.status = status;

			this.EventService.save(event);

			res.status(200).json(new ResponseHandler(true, 200, event));
		} catch (error) /* istanbul ignore next */  {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
