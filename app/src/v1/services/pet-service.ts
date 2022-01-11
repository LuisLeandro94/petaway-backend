import Service from './service';
import Pet from '~models/pet';

export default class PetService extends Service {
	constructor() {
		super(Pet);
	}
}
