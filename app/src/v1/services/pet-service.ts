import Service from './service';
import Pet from '~models/pet';

export default class PetController extends Service {
	constructor() {
		super(Pet);
	}
}
