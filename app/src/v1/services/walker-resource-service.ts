import Service from './service';
import WalkerResource from '~models/walker-service';

export default class WalkerResourceService extends Service {
	constructor() {
		super(WalkerResource);
	}
}
