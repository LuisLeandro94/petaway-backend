import Service from './service';
import WalkerPet from '~models/walker-pet';

export default class WalkerPetService extends Service {
	constructor() {
		super(WalkerPet);
	}
}
