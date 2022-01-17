import { sequelize } from '~models';
import { PetService, UserService } from '~v1/services';
import Relations from '~models/relations';
import User from '~models/user';
import Pet from '~models/pet';

export {};

const request = require('supertest');

const MAIN_ROUTE = '/v1/pets';
const LOGIN_ROUTE = '/v1/auth';

const userService = new UserService();
const petService = new PetService();

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

test('Test #13 - Doing login', () => request(app)
		.post(LOGIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		}));

test('Test #14 - Get All Pets with login', async () => {
	const pet = new Pet({ type: 'Dog' });
	await petService.save(pet);
	return request(app)
		.get(MAIN_ROUTE)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.length).toBeGreaterThan(0);
		});
});

test('Test #15 - Get All Pets without login', async () => {
	const pet = new Pet({ type: 'Cat' });
	await petService.save(pet);
	return request(app)
		.get(MAIN_ROUTE)
		.then((res) => {
			expect(res.status).toBe(401);
			expect(res.body.result).toBe('Failed to authenticate token.');
		});
});

test('Test #16 - Get single Pet by id with login', async () => {
	const pet = new Pet({ type: 'Cat' });
	await petService.save(pet);
	return request(app)
		.get(`${MAIN_ROUTE}/${pet.id}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.type).toBe('Cat');
		});
});

test('Test #17 - Get single Pet but does not exit', async () => {
	const pet = new Pet({ type: 'Cat' });
	const addedPet = await petService.save(pet);
	const petIdToTest = addedPet.id;
	await Pet.destroy({
		where: {
			id: addedPet.id
		}
	});
	return request(app)
		.get(`${MAIN_ROUTE}/${petIdToTest}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body.result).toBe(`Pet dosen't exist`);
		});
});

test('Test #18 - Get single Pet by id without login', () => request(app)
		.get(`${MAIN_ROUTE}/${1}`)
		.then((res) => {
			expect(res.status).toBe(401);
			expect(res.body.result).toBe('Failed to authenticate token.');
		}));
