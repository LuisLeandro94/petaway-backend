import { createClient } from 'redis';

require('dotenv').config();

class RedisClient {
	client: any;

	constructor() {
		this.client = createClient({
			url: process.env.REDIS_URL
		});
	}

	set = async (key, value) => {
		await this.client.connect();
		await this.client.set(key, value);
		this.client.quit()
	};

	get = async (key) => {
		await this.client.connect();
		const result = await this.client.get(key);
		this.client.quit()
		return result;
	};
}

export default RedisClient;
