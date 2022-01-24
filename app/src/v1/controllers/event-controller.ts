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
import Resource from '~models/resource';
import Pet from '~models/pet';
import User from '~models/user';
import Walker from '~models/walker';

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
			if (!(await this.WalkerPetService.any({ walkerId, petId }))) {
				throw new ErrorHandler('Walker does not have this pet', 400);
			}
			if (!(await this.WalkerResourceService.any({ walkerId, serviceId }))) {
				throw new ErrorHandler('Walker does not have this service', 400);
			}
			const event = new Event({
				userId,
				walkerId,
				resourceId: serviceId,
				petId,
				date,
				status: EventStatus.Created as number
			});
			await this.EventService.save(event);
			res.status(201).json(new ResponseHandler(true, 201, event));
		} catch (error) /* istanbul ignore next */ {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getByUser = async (req: Request, res: Response): Promise<void> => {
		try {
			let events_: any = [];
			const userId = req.user_id;
			const events = await this.EventService.get(null, null, null, null, null, { userId });
			await Promise.all(
				events.map(async (event: Event) => {
					let event_: any = {};
					event_['id'] = event.id;
					event_['userId'] = event.userId;
					event_['walkerId'] = event.walkerId;
					event_['date'] = event.date;
					event_['status'] = event.status;
					event_['service'] = await this.ResourceService.getSingle(null, { id: event.resourceId });
					event_['pet'] = await this.PetService.getSingle(null, { id: event.petId });
					event_['user'] = await this.UserService.getSingle([User.associations.userData], { id: event.userId });
					const walker: Walker = await this.WalkerService.getSingle(null, { id: event.walkerId });
					event_['walker'] = await this.UserService.getSingle([User.associations.userData], { id: walker.userId });
					events_.push(event_);
				})
			);
			res.status(200).json(new ResponseHandler(true, 200, events_));
		} catch (error) /* istanbul ignore next */ {
			console.log(error);
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};

	getByWalker = async (req: Request, res: Response): Promise<void> => {
		try {
			const { walkerId } = req.query;
			let events_: any = [];
			const events = await this.EventService.get(null, null, null, null, null, { walkerId });
			await Promise.all(
				events.map(async (event: Event) => {
					let event_: any = {};
					event_['id'] = event.id;
					event_['userId'] = event.userId;
					event_['walkerId'] = event.walkerId;
					event_['date'] = event.date;
					event_['status'] = event.status;
					event_['service'] = await this.ResourceService.getSingle(null, { id: event.resourceId });
					event_['pet'] = await this.PetService.getSingle(null, { id: event.petId });
					event_['user'] = await this.UserService.getSingle([User.associations.userData], { id: event.userId });
					const walker: Walker = await this.WalkerService.getSingle(null, { id: event.walkerId });
					event_['walker'] = await this.UserService.getSingle([User.associations.userData], { id: walker.userId });
					events_.push(event_);
				})
			);
			res.status(200).json(new ResponseHandler(true, 200, events_));
		} catch (error) /* istanbul ignore next */ {
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
		} catch (error) /* istanbul ignore next */ {
			res.status(error.code).json(new ResponseHandler(false, error.code, error.message));
		}
	};
}
