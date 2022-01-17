import { sequelize } from '~models';
import { ResourceService, UserService } from '~v1/services';
import Relations from '~models/relations';
import User from '~models/user';
import Resource from '~models/resource';

export {};

const request = require('supertest');

const MAIN_ROUTE = '/v1/services';
const LOGIN_ROUTE = '/v1/auth';

const userService = new UserService();
const resourceService = new ResourceService();

let user = new User({
	email: `${Date.now()}@petaway.pt`,
	password: 'test€€€€'
});

let app;
let jwt;

beforeAll(async () => {
	const mod = await import('../../src/app');
	app = (mod as any).default;
	user = await userService.save(user);
	sequelize
		.authenticate()
		.then(async () => {
			new Relations().defineRelations();
		})
		.catch((err) => console.log(`Error: ${err}`));
});

test('Test #19 - Doing login', () => request(app)
		.post(LOGIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		}));

test('Test #20 - Get single service by id with login', async () => {
	const service = new Resource({ type: 'Pet walking' });
	await resourceService.save(service);
	return request(app)
		.get(`${MAIN_ROUTE}/${service.id}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.type).toBe('Pet walking');
		});
});

test("Test #21 - Get single service by id but service dosen't exist", async () => {
	await Resource.destroy({
		where: {
			id: 2000
		}
	});
	return request(app)
		.get(`${MAIN_ROUTE}/${2000}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body.result).toBe("Service dosen't exist");
		});
});

test('Test #22 - Get single service by id without login', () => request(app)
		.get(`${MAIN_ROUTE}/${1}`)
		.then((res) => {
			expect(res.status).toBe(401);
			expect(res.body.result).toBe('Failed to authenticate token.');
		}));

test('Test #23 - Get all services with login', async () => {
	const service = new Resource({ type: 'Pet sitter' });
	await resourceService.save(service);

	return request(app)
		.get(MAIN_ROUTE)
		.set('authorization', `Bearer ${jwt}`)

		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.length).toBeGreaterThan(0);
		});
});

test('Test #24 - Get all services without login', async () => {
	const service = new Resource({ type: 'Pet sitter' });
	await resourceService.save(service);

	return request(app)
		.get(MAIN_ROUTE)
		.then((res) => {
			expect(res.status).toBe(401);
			expect(res.body.result).toBe('Failed to authenticate token.');
		});
});
