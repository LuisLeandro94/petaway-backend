import Service from './service';
import Resource from '~models/resource';

export default class ResourceService extends Service {
	constructor() {
		super(Resource);
	}
}
