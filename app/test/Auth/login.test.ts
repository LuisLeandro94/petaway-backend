import { sequelize } from '~models';
import { UserService } from '~v1/services';
import Relations from '~models/relations';
import User from '~models/user';

export {};

const request = require('supertest');

const MAIN_ROUTE = '/v1/auth';

const userService = new UserService();

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

test('Test #1 - Doing login', async () => request(app)
		.post(MAIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		}));

test('Test #2 - Doing login with wrong user', async () => request(app)
		.post(MAIN_ROUTE)
		.send({ email: `${user.email} not_yet`, password: user.password })
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body.result).toBe('User does not exist');
		}));

test('Test #3 - Protected routes', () => request(app)
		.get('/v1/users')
		.then((res) => {
			expect(res.status).toBe(401);
		}));
