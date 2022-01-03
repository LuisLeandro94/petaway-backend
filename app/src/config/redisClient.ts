import { createClient } from 'redis';

require('dotenv').config();

class RedisClient {
	client: any;

	constructor() {
		this.client = createClient({
			url: process.env.REDIS_URL
		});
		this.client.connect();
	}

	set = async (key, value) => {
		await this.client.set(key, value);
		this.client.disconnect();
	};

	get = async (key) => {
		// await this.client.connect();
		const result = await this.client.get(key);
		return result;
	};
}

export default RedisClient;
