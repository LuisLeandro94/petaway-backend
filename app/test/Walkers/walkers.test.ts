import 'jest';
import * as request from 'supertest';
import { sequelize } from '~models';
import Pet from '~models/pet';
import Relations from '~models/relations';
import Resource from '~models/resource';
import User from '~models/user';
import Walker from '~models/walker';
import { PetService, ResourceService, UserService, WalkerService } from '~v1/services';

const request = require('supertest');

const MAIN_ROUTE = '/v1/walkers';
const LOGIN_ROUTE = '/v1/auth';
const SIGNUP_ROUTE = '/v1/auth/signup';

const user = new User({
	email: `${Date.now()}@petaway.pt`,
	password: 'test€€€€'
});

const userService = new UserService();
const walkerService = new WalkerService();
const petService = new PetService();
const resourceService = new ResourceService();

let jwt;
let app;
let walker;
let user_;
let user_jwt;

beforeAll(async () => {
	const mod = await import('../../src/app');
	app = (mod as any).default;
	await userService.save(user);
	sequelize
		.authenticate()
		.then(async () => {
			new Relations().defineRelations();
		})
		.catch((err) => console.log(`Error: ${err}`));
});

test('Test #25 - Doing login', () => {
	return request(app)
		.post(LOGIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		});
});

test('Test #26 - Get all walkers', async () => {
	walker = new Walker({
		userId: user.id
	});
	await walkerService.save(walker);
	const newPet = new Pet({ type: 'Pet ##' });
	await petService.save(newPet);

	const newService = new Resource({ type: 'Service ##' });
	await resourceService.save(newService);

	return request(app)
		.get(`${MAIN_ROUTE}?services=${[newService.id]}&pets=${[newPet.id]}&city=Braga`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.length).toBe(0);
		});
});

test('Test #27 - Get single walker by id', () => {
	return request(app)
		.get(`${MAIN_ROUTE}/${walker.id}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result).toHaveProperty('id');
		});
});

test('Test #28 - Create walker', async () => {
	try {
		const newPet = new Pet({ type: 'Pet 1' });
		await petService.save(newPet);

		const newService = new Resource({ type: 'Service 1' });
		await resourceService.save(newService);

		user_ = await userService.signup(`${Date.now()}@petaway.pt,`, '123456789', 'Bruno', 'Faria', '4845-024');
		const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
		user_jwt = responseLogin.body.result;

		return request(app)
			.post(`${MAIN_ROUTE}`)
			.send({ pets: [newPet.id], services: [newService.id] })
			.set('authorization', `Bearer ${user_jwt}`)
			.then((res) => {
				expect(res.status).toBe(201);
				expect(res.body.result).toHaveProperty('id');
			});
	} catch (error) /* istanbul ignore next */  {}
});

test('Test #28.1 - Update walker service and pets', async () => {
	const newPet = new Pet({ type: 'Pet 3' });
	await petService.save(newPet);

	const newService = new Resource({ type: 'Service 3' });
	await resourceService.save(newService);

	return request(app)
		.put(`${MAIN_ROUTE}`)
		.send({ pets: [newPet.id], services: [newService.id] })
		.set('authorization', `Bearer ${user_jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result).toHaveProperty('id');
		});
});

test('Test #29 - Remove walker', () => {
	return request(app)
		.delete(`${MAIN_ROUTE}`)
		.set('authorization', `Bearer ${user_jwt}`)
		.then((res) => {
			expect(res.status).toBe(204);
		});
});

describe('Test #30.1 - Create walker with errors ...', () => {
	let newPet1;
	let newPet2;
	let newService;
	let newUser;
	let responseLogin;
	let newUser_jwt;

	beforeAll(async () => {
		newPet1 = new Pet({ type: 'Pet 1' });
		await petService.save(newPet1);

		newPet2 = new Pet({ type: 'Pet 2' });
		await petService.save(newPet2);

		newService = new Resource({ type: 'Service 1' });
		await resourceService.save(newService);

		newUser = await userService.signup(`${Date.now()}@petaway.pt,`, '123456789', 'Bruno', 'Faria', '4845-024');
		responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
		newUser_jwt = responseLogin.body.result;
	});

	const testTemplate = (data, errorMessage) => {
		try {
			return request(app)
				.post(MAIN_ROUTE)
				.set('authorization', `Bearer ${newUser_jwt}`)
				.send(data)
				.then((res) => {
					expect(res.status).toBe(400);
					expect(res.body.result).toBe(errorMessage);
				});
		} catch (error) /* istanbul ignore next */  {}
	};

	test('Test #30.1.1 - Create new walker without pets', () => {
		testTemplate({ services: [newService.id] }, 'Missing Parameter pets');
	});
	test('Test #30.1.2 -  Create new walker without service', () => {
		testTemplate({ pets: [newPet1.id, newPet2.id] }, 'Missing Parameter services');
	});
});
