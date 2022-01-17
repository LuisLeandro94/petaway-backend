import 'jest';
import * as request from 'supertest';
import { sequelize } from '~models';
import Pet from '~models/pet';
import Relations from '~models/relations';
import Resource from '~models/resource';
import User from '~models/user';
import Walker from '~models/walker';
import WalkerPet from '~models/walker-pet';
import WalkerResource from '~models/walker-service';
import Event from '~models/event';

import {
	UserService,
	WalkerService,
	PetService,
	ResourceService,
	WalkerResourceService,
	WalkerPetService
} from '~v1/services';

const request = require('supertest');

const MAIN_ROUTE = '/v1/events';
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
const walkerResourceService = new WalkerResourceService();
const walkerPetService = new WalkerPetService();

let jwt;
let app;
let templateToTest_;
let eventId;
class Mocks {
	addService: boolean = false;
	addPet: boolean = false;
	constructor(addService, addPet) {
		this.addService = addService;
		this.addPet = addPet;
	}

	async templateToTest() {
		try {
			const walker = new Walker({
				userId: user.id
			});
			const addedWalker = await walkerService.save(walker);
			const newPet = new Pet({ type: 'Pet ##' });
			const addedPet = await petService.save(newPet);

			const newService = new Resource({ type: 'Service ##' });
			const addedService = await resourceService.save(newService);

			const user_ = await userService.signup(`${Date.now()}@petaway.pt,`, '123456789', 'Ricardo', 'Ferreira', '4845-024');
			const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
			const user_jwt = responseLogin.body.result;

			if (this.addService) {
				const walkerService = new WalkerResource({
					walkerId: addedWalker.id,
					serviceId: addedService.id
				});
				await walkerResourceService.save(walkerService);
			}

			if (this.addPet) {
				const walkerPet = new WalkerPet({
					walkerId: addedWalker.id,
					petId: addedPet.id
				});
				await walkerPetService.save(walkerPet);
			}
			return { walker: addedWalker, newPet: addedPet, newService: addedService, newUser: user_, user_jwt };
		} catch (error) /* istanbul ignore next */ {}
	}
}

beforeAll(async () => {
	try {
		const mod = await import('../../src/app');
		app = (mod as any).default;
		await userService.save(user);
		sequelize
			.authenticate()
			.then(async () => {
				new Relations().defineRelations();
			})
			.catch((err) => console.log(`Error: ${err}`));
		templateToTest_ = await new Mocks(true, true).templateToTest();
	} catch (error) /* istanbul ignore next */ {}
});

test('Test #31 - Doing login', () => {
	return request(app)
		.post(LOGIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		});
});

test('Test #33 - Create new event', async () => {
	try {
		const dataRequest = {
			petId: templateToTest_.newPet.id,
			serviceId: templateToTest_.newService.id,
			walkerId: templateToTest_.walker.id,
			date: '2022-01-20 10:51:17.6+00'
		};
		return request(app)
			.post(`${MAIN_ROUTE}`)
			.set('authorization', `Bearer ${templateToTest_.user_jwt}`)
			.send(dataRequest)
			.then((res) => {
				eventId = res.body.result.id;
				expect(res.status).toBe(201);
				expect(res.body.result.walkerId).toBe(templateToTest_.walker.id);
			});
	} catch (error) /* istanbul ignore next */ {}
});

test('Test #34 - Get all events by user', () => {
	return request(app)
		.get(`${MAIN_ROUTE}/user`)
		.set('authorization', `Bearer ${templateToTest_.user_jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.length).toBeGreaterThan(0);
		});
});

test('Test #35 -  Get all events by walker', () => {
	return request(app)
		.get(`${MAIN_ROUTE}/walker?walkerId=${templateToTest_.walker.id}`)
		.set('authorization', `Bearer ${templateToTest_.user_jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.length).toBeGreaterThan(0);
		});
});

test('Test #36 - Update event status', async () => {
	return request(app)
		.put(`${MAIN_ROUTE}`)
		.send({ eventId: eventId, status: 2 })
		.set('authorization', `Bearer ${templateToTest_.user_jwt}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result).toHaveProperty('userId');
		});
});

test('Test #36 - Update event status bu event does not exist', async () => {
	await Event.destroy({
		where: {
			id: eventId
		}
	});
	return request(app)
		.put(`${MAIN_ROUTE}`)
		.send({ eventId: eventId, status: 2 })
		.set('authorization', `Bearer ${templateToTest_.user_jwt}`)
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body.result).toBe('Event does not exist');
		});
});

describe('Test #33.1 - Create new event with erros ...', () => {
	let templateToTest;

	beforeAll(async () => {
		templateToTest = await new Mocks(false, false).templateToTest();
	});

	const testTemplate = async (data, errorMessage) => {
		return await request(app)
			.post(MAIN_ROUTE)
			.send(data)
			.set('authorization', `Bearer ${templateToTest_.user_jwt}`)
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body.result).toBe(errorMessage);
			});
	};

	test('Test #33.1.1 - Create new event without pets', () => {
		testTemplate(
			{
				serviceId: templateToTest.newService.id,
				userId: templateToTest.newUser.id,
				walkerId: templateToTest.walker.id,
				date: '30-12-2021'
			},
			'Missing Parameter petId'
		);
	});
	test('Test #33.1.2 -  Create new event without service', () => {
		testTemplate(
			{
				petId: templateToTest.newPet.id,
				userId: templateToTest.newUser.id,
				walkerId: templateToTest.walker.id,
				date: '30-12-2021'
			},
			'Missing Parameter serviceId'
		);
	});
	test('Test #33.1.4 - Create new event without walker', () => {
		testTemplate(
			{
				petId: templateToTest.newPet.id,
				serviceId: templateToTest.newService.id,
				userId: templateToTest.newUser.id,
				date: '30-12-2021'
			},
			'Missing Parameter walkerId'
		);
	});
	test('Test #33.1.4 - Create new event without date', () => {
		testTemplate(
			{
				petId: templateToTest.newPet.id,
				serviceId: templateToTest.newService.id,
				userId: templateToTest.newUser.id,
				walkerId: templateToTest.walker.id
			},
			'Missing Parameter date'
		);
	});
	test('Test #33.1.5 - Create new event but walker does not exist', async () => {
		const newTemplateToTest = await new Mocks(true, true).templateToTest();
		await Walker.destroy({
			where: {
				id: newTemplateToTest.walker.id
			}
		});
		testTemplate(
			{
				petId: newTemplateToTest.newPet.id,
				serviceId: newTemplateToTest.newService.id,
				walkerId: newTemplateToTest.walker.id,
				date: '2022-01-20 10:51:17.6+00'
			},
			'Walker does not exist'
		);
	});
	test('Test #33.1.6 - Create new event but walker does not have pet', async () => {
		const newTemplateToTest = await new Mocks(true, true).templateToTest();
		await WalkerPet.destroy({
			where: {
				petId: newTemplateToTest.newPet.id
			}
		});
		testTemplate(
			{
				petId: newTemplateToTest.newPet.id,
				serviceId: newTemplateToTest.newService.id,
				walkerId: newTemplateToTest.walker.id,
				date: '2022-01-20 10:51:17.6+00'
			},
			'Walker does not have this pet'
		);
	});
	test('Test #33.1.7 - Create new event but walker does not have service', async () => {
		const newTemplateToTest = await new Mocks(true, true).templateToTest();
		await WalkerResource.destroy({
			where: {
				serviceId: newTemplateToTest.newService.id
			}
		});
		testTemplate(
			{
				petId: newTemplateToTest.newPet.id,
				serviceId: newTemplateToTest.newService.id,
				walkerId: newTemplateToTest.walker.id,
				date: '2022-01-20 10:51:17.6+00'
			},
			'Walker does not have this service'
		);
	});
});
