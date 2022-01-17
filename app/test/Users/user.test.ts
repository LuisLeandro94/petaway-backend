import 'jest';
import * as request from 'supertest';
import { sequelize } from '~models';
import { UserService } from '~v1/services';
import Relations from '~models/relations';
import User from '~models/user';
import RedisClient from '~config/redisClient';
import { v4 as uuidv4 } from 'uuid';

const request = require('supertest');
const MAIN_ROUTE = '/v1/users';
const LOGIN_ROUTE = '/v1/auth';
const SIGNUP_ROUTE = '/v1/auth/signup';

const user = new User({
	email: `${Date.now()}@petaway.pt`,
	password: 'test€€€€'
});

const userService = new UserService();

let jwt;
let app;

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

test('Test #25 - Doing login', async () => {
	await request(app)
		.post(LOGIN_ROUTE)
		.send({ email: user.email, password: user.password })
		.then((res) => {
			jwt = res.body.result;
			expect(res.status).toBe(201);
		});
});

test('Test #26 - Get single user by jwt', async () => {
	try {
		const user_ = await userService.signup(`${Date.now()}@petaway.pt,`, '123456789', 'carlos', 'Panado', '4845-024');
		const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
		return await request(app)
			.get(`${MAIN_ROUTE}`)
			.set({ authorization: `Bearer ${responseLogin.body.result}` })
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result.userData.lastName).toBe('Panado');
				expect(res.body.result.id).toBe(user_.id);
			});
	} catch (error) {}
});

test('Test #27 - Get single user by id', async () => {
	try {
		const user_ = await userService.signup(`${Date.now()}@petaway.pt,`, '123456789', 'carlos', 'Panado', '4845-024');
		const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
		return await request(app)
			.get(`${MAIN_ROUTE}/${user_.id}`)
			.set({ authorization: `Bearer ${responseLogin.body.result}` })
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result.userData.lastName).toBe('Panado');
				expect(res.body.result.id).toBe(user_.id);
			});
	} catch (error) {}
});

test("Test #28 - Get single user by id  but user dosen't exist", async () => {
	try {
		const user_ = await userService.signup(`${Date.now()}@petaway.pt,`, '123456789', 'carlos', 'Panado', '4845-024');
		const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
		await User.destroy({
			where: {
				id: user_.id
			}
		});
		return await request(app)
			.get(`${MAIN_ROUTE}`)
			.set({ authorization: `Bearer ${responseLogin.body.result}` })
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body.result).toBe('User does not exist');
			});
	} catch (error) {}
});

test('Test #29 - Update user', async () => {
	const user_ = {
		email: `${Date.now()}@petaway.pt`,
		password: 'test€€€€',
		firstName: 'Marco',
		lastName: 'Tinta',
		postalCode: '4845-024'
	};
	const userAdded = await request(app).post(SIGNUP_ROUTE).send(user_);
	const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
	return await request(app)
		.put(`${MAIN_ROUTE}`)
		.send({
			firstName: 'Carlos',
			lastName: 'Litos',
			address_1: 'Rua da luz',
			address_2: 'Rua da luz 2',
			city: 'Braga',
			state: 'Braga',
			zip: '4845-220',
			country: 'Portugal',
			profilePhoto: 'avatar.jpg',
			birthdate: '29/12/1999',
			phoneNumber: '928182882882'
		})
		.set('authorization', `Bearer ${responseLogin.body.result}`)
		.then((res) => {
			expect(res.status).toBe(200);
			expect(res.body.result.userData.firstName).toBe('Marco');
			expect(res.body.result.id).toBe(userAdded.body.result.id);
		});
});

test('Test #30 (user) - Update password but user does not exist', async () => {
	const user_ = await userService.signup(`${Date.now()}@petaway.pt,`, 'test€€€€', 'Marco', 'Tinta', '4845-024');
	const responseLogin_ = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
	await User.destroy({
		where: {
			id: user_.id
		}
	});
	return await request(app)
		.put(`${MAIN_ROUTE}/password`)
		.send({
			password: 'newPassword'
		})
		.set('authorization', `Bearer ${responseLogin_.body.result}`)
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body.result).toBe('User does not exist');
		});
});

test('Test #31 - Remove user', () => {
	return request(app)
		.delete(`${MAIN_ROUTE}`)
		.set('authorization', `Bearer ${jwt}`)
		.then((res) => {
			expect(res.status).toBe(204);
		});
});

test('Test #32 (user) - Update password', async () => {
	const user_ = {
		email: `${Date.now()}@petaway.pt`,
		password: 'test€€€€',
		firstName: 'Marco',
		lastName: 'Tinta',
		postalCode: '4845-024'
	};
	await request(app).post(SIGNUP_ROUTE).send(user_);
	const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
	return await request(app)
		.put(`${MAIN_ROUTE}/password`)
		.send({
			password: 'newPassword'
		})
		.set('authorization', `Bearer ${responseLogin.body.result}`)
		.then((res) => {
			expect(res.status).toBe(200);
		});
});


test('Test #33 - Update user but user does not exist', async () => {
	const user_ = await userService.signup(`${Date.now()}@petaway.pt,`, 'test€€€€', 'Marco', 'Tinta', '4845-024');
	const responseLogin = await request(app).post(LOGIN_ROUTE).send({ email: user_.email, password: user_.password });
	await User.destroy({
		where: {
			id: user_.id
		}
	});
	return await request(app)
		.put(`${MAIN_ROUTE}`)
		.send({
			firstName: 'Carlos',
			lastName: 'Litos',
			address_1: 'Rua da luz',
			address_2: 'Rua da luz 2',
			city: 'Braga',
			state: 'Braga',
			zip: '4845-220',
			country: 'Portugal',
			profilePhoto: 'avatar.jpg',
			birthdate: '29/12/1999',
			phoneNumber: '928182882882'
		})
		.set('authorization', `Bearer ${responseLogin.body.result}`)
		.then((res) => {
			expect(res.status).toBe(400);
			expect(res.body.result).toBe('User does not exist');
		});
});


