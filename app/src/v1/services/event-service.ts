import Service from './service';
import Event from '~models/event';

export default class EventService extends Service {
	constructor() {
		super(Event);
	}
}
