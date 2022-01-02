import Service from './service';
import Resource from '~models/resource';

export default class ResourceController extends Service {
	constructor() {
		super(Resource);
	}
}
