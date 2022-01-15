export {};
import { sequelize } from '~models';
import { PetService, UserService } from '~v1/services';
import Relations from '~models/relations';
import User from '~models/user';
import Pet from '~models/pet';

const request = require('supertest');
const MAIN_ROUTE = '/v1/pets';
const LOGIN_ROUTE = '/v1/auth';

const userService = new UserService();
const petService = new PetService();

let user = new User({
	email: `${Date.now()}@ipca.pt`,
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

test('Test #8 - Doing login', () => {
	return request(app)
		.post(LOGIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		});
});

test('Test #9 - Get All Pets with login', async () => {
	const pet = new Pet({ type: 'Dog' });
	await petService.save(pet);
	return request(app)
		.get(MAIN_ROUTE)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(201);
			expect(res.body.result.length).toBeGreaterThan(0);
		});
});

test('Test #11 - Get All Pets without login', async () => {
	const pet = new Pet({ type: 'Cat' });
	await petService.save(pet);
	return request(app)
		.get(MAIN_ROUTE)
		.then((res) => {
			expect(res.status).toBe(401);
			expect(res.body.result).toBe('Failed to authenticate token.');
		});
});

test('Test #10 - Get single Pet by id with login', async () => {
	const pet = new Pet({ type: 'Cat' });
	await petService.save(pet);
	return request(app)
		.get(`${MAIN_ROUTE}/${pet.id}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(201);
			expect(res.body.result.type).toBe('Cat');
		});
});

test('Test #12 - Get single Pet by id without login', () => {
	return request(app)
		.get(`${MAIN_ROUTE}/${1}`)
		.then((res) => {
			expect(res.status).toBe(401);
			expect(res.body.result).toBe('Failed to authenticate token.');
		});
});
