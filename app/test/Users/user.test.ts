export {};
import { UserService } from '~v1/services';
const request = require('supertest');
const MAIN_ROUTE = '/v1/users';
const LOGIN_ROUTE = 'v1/auth/signin';

let app;
beforeAll(async () => {
	const mod = await import('../../src/app');
	app = (mod as any).default;
});

// beforeAll(async () => {
//   user = await this.userService.add({
//     email: ${Date.now()}@ipca.pt,
//     password: "test€€€€",
//     userData: {},
//   });
// });

// test("Test #20 - Doing login", () => {
//   return request(app)
//     .post(LOGIN_ROUTE)
//     .send({ email: user.email, password: user.password })
//     .then((res) => {
//       user.jwt = res.body.token;
//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("token");
//     });
// });

test('Test #22 - Get single user by id', async () => {
	try {
		const userService: UserService = new UserService();
		const user = await userService.signup(`${Date.now()}@ipca.pt,`, '123456789', 'string', 'string', 'string');
		return (
			request(app)
				.get(`${MAIN_ROUTE}/${user.id}`)
				// .set('authorization', `bearer ${user.token}`)
				.then((res) => {
					expect(res.status).toBe(200);
					expect(res.body.result.userData.lastName).toBe('Panado');
					expect(res.body.result.id).toBe(user.id);
				})
		);
	} catch (error) {}
});

// test("Test #23 - Update user", () => {
//   const user = await userService.add({
//     userData: {
//       firstName: "Dog",
//       lastName: "Panado",
//       address_1: "Rua das pedras",
//       address_2: "Lugar do azeite",
//       city: "Famalicão",
//       zip: "4000-909",
//       country: "Portugal",
//       profilePhoto: "",
//       birthdate: "",
//       phoneNumber: "",
//     },
//   });
//   user.userData.firstName = "cat";
//   return request(app)
//     .put(`${MAIN_ROUTE}/${user.id}`)
//     .send(user)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.firstName).toBe("cat");
//       expect(res.body.id).toBe(user.id);
//     });
// });

// test("Test #24 - Remove user", () => {
//   const user = await userService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {
//       firstName: "Dog",
//       lastName: "Panado",
//       postalCode: "4845-024",
//     },
//   });
//   user.userData.firstName = "cat";
//   return request(app)
//     .delete(`${MAIN_ROUTE}/${user.id}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.firstName).toBe("cat");
//       expect(res.body.id).toBe(user.id);
//     });
// });
