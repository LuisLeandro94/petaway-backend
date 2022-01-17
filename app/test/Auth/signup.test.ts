export {};
const request = require('supertest');
const _email = `${Date.now()}@petaway.pt`;
const MAIN_ROUTE = '/v1/auth/signup';

let user = {
	email: _email,
	password: '123456789',
	firstName: 'Dog',
	lastName: 'Semedo',
	postalCode: '4845-024'
};

let app;
beforeAll(async () => {
	const mod = await import('../../src/app');
	app = (mod as any).default;
});

test('Test #4 - Doing signup', () => {
	return request(app)
		.post(MAIN_ROUTE)
		.send(user)
		.then((res) => {
			expect(res.status).toBe(201);
			expect(res.body.result).toHaveProperty('email');
		});
});

describe('Test #5 - Doing signup with erros ...', () => {
	const testTemplate = async (data, errorMessage) => {
		return await request(app)
			.post(MAIN_ROUTE)
			.send(data)
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body.result).toBe(errorMessage);
			}).catch();
	};

	test('Test #5.1 - SignUp without firstName', () => {
    const user_ = { ...user };
		delete user_.firstName;
		testTemplate(user_, 'Missing Parameter firstName');
	});
	test('Test #5.2 - SignUp without lastName', () => {
    const user_ = { ...user };
		delete user_.lastName;
		testTemplate(user_, 'Missing Parameter lastName');
	});
	test('Test #5.3 - SignUp without postalCode', () => {
    const user_ = { ...user };
		delete user_.postalCode;
		testTemplate(user_, 'Missing Parameter postalCode');
	});
	test('Test #5.4 - SignUp without password', () => {
    const user_ = { ...user };
		delete user_.password;
		testTemplate(user_, 'Missing Parameter password');
	});
	test('Test #5.5 - SignUp without email', () => {
    const user_ = { ...user };
		delete user_.email;
		testTemplate(user_, 'Missing Parameter email');
	});
	test('Test #5.6 - Email duplicated', async () => {
    const user_ = { ...user };
		testTemplate(user_, 'Email already in use');
	});
});
