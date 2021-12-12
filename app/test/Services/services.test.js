// const request = require("supertest");
// const app = require("~app");
// const { ResourseService } = require("~service");
// const MAIN_ROUTE = "/v1/services";
// const LOGIN_ROUTE = "v1/auth/signin";

// beforeAll(async () => {
//   user = await this.userService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
// });

// test("Test #13 - Doing login", () => {
//   return request(app)
//     .post(LOGIN_ROUTE)
//     .send({ email: user.email, password: user.password })
//     .then((res) => {
//       user.jwt = res.body.token;
//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("token");
//     });
// });


// test("Test #15 - Get single service by id with login", () => {
//   return request(app)
//     .get(`${MAIN_ROUTE}/${1}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.type).toBe("Dog");
//     });
// });

// test("Test #17 - Get single service by id but service dosen't exist", () => {
//   return request(app)
//     .get(`${MAIN_ROUTE}/${2000}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(400);
//       expect(res.body.error).toBe("Service dosen't exist");
//     });
// });

// test("Test #19 - Get single service by id without login", () => {
//   return request(app)
//     .get(`${MAIN_ROUTE}/${1}`)
//     .then((res) => {
//       expect(res.status).toBe(401);
//       expect(res.body.error).toBe("Invalid authentication! #1");
//     });
// });



// test("Test #14 - Get all services with login", () => {
//   return ResourseService.add({
//     type: "Pet Walking",
//   })
//     .then(() =>
//       request(app).get(MAIN_ROUTE).set("authorization", `bearer ${user.token}`)
//     )
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });


// test("Test #18 - Get all services without login", () => {
//   return ResourseService.add({
//     type: "Pet Walking",
//   })
//     .then(() => request(app).get(MAIN_ROUTE))
//     .then((res) => {
//       expect(res.status).toBe(401);
//       expect(res.body.error).toBe("Invalid authentication! #1");
//     });
// });

