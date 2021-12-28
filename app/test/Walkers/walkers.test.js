test("", () => {});

// const request = require("supertest");
// const app = require("~app");
// const {UserService, WalkerService,PetService,ResourseService } = require("~service");

// const MAIN_ROUTE = "/v1/walkers";
// const LOGIN_ROUTE = "v1/auth/signin";

// beforeAll(async () => {
//   user = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
// });

// test("Test #25 - Doing login", () => {
//   return request(app)
//     .post(LOGIN_ROUTE)
//     .send({ email: user.email, password: user.password })
//     .then((res) => {
//       user.jwt = res.body.token;
//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("token");
//     });
// });

// test("Test #26 - Get all walkers", () => {
//   return request(app)
//     .get(MAIN_ROUTE)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// test("Test #27 - Get single walker by id", () => {
//   const walker = await WalkerService.add({
//     userId: user.id,
//   });
//   return request(app)
//     .get(`${MAIN_ROUTE}/${walker.id}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.id).toBe(walker.id);
//     });
// });

// test("Test #28 - Update walker service and pets", () => {
//   var newPet = PetService.add({ type: "Dog" });
//   var newService = ResourseService.add({ type: "service123" });

//   return request(app)
//     .put(`${MAIN_ROUTE}/${walker.id}`)
//     .send({ pets: [newPet.id], services: [newService.id] })
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.id).toBe(walker.id);
//     });
// });

// test("Test #29 - Remove walker", () => {
//   const walker = await WalkerService.add({
//     userId: user.id,
//   });
//   return request(app)
//     .delete(`${MAIN_ROUTE}/${walker.id}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.id).toBe(walker.id);
//     });
// });


// test("Test #30 - Create walker", () => {
//   var newPet1 = PetService.add({ type: "Bird" });
//   var newPet2 = PetService.add({ type: "Whale" });
//   var newService = ResourseService.add({ type: "service#" });
//   const newUser = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
//   return request(app)
//     .post(`${MAIN_ROUTE}`)
//     .send({ pets: [newPet1.id,newPet2.id], services: [newService.id], userId: newUser.id })
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.id).toBe(walker.id);
//     });
// });

// describe("Test #30.1 - Create walker with errors ...", () => {
//   var newPet1 = PetService.getSingle({ type: "Dog" });
//   var newPet2 = PetService.getSingle({ type: "Whale" });
//   var newService = ResourseService.getSingle({ type: "service" });
//   const newUser = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
//   const testTemplate = (data, errorMessage) => {
//     return request(app)
//       .post(MAIN_ROUTE)
//       .send(data)
//       .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body.error).toBe(errorMessage);
//       });
//   };

//   test("Test #30.1.1 - Create new walker without pets", () => {
//     testTemplate({ pets: [], services: [newService.id], userId: newUser.id }, "The pets field is required");
//   });
//   test("Test #30.1.2 -  Create new walker without service", () => {
//     testTemplate({ pets: [newPet1.id,newPet2.id], services: [], userId: newUser.id }, "The service field is required");
//   });
//   test("Test #30.1.3 - Create new walker without user", () => {
//     testTemplate({ pets: [newPet1.id,newPet2.id], services: [newService.id], userId: null }, "The userId field is required");
//   });

// });