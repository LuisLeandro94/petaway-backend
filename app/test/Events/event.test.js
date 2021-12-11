// const request = require("supertest");
// const app = require("~app");
// const {UserService,WalkerService, PetService, ResourseService, EventService} = require("~service");

// const MAIN_ROUTE = "/v1/events";
// const LOGIN_ROUTE = "v1/auth/signin";

// let userIdToGet = 0;
// let walkerIdToGet = 0;

// beforeAll(async () => {
//   user = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
// });

// test("Test #31 - Doing login", () => {
//   return request(app)
//     .post(LOGIN_ROUTE)
//     .send({ email: user.email, password: user.password })
//     .then((res) => {
//       user.jwt = res.body.token;
//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("token");
//     });
// });

// test("Test #33 - Create new event", () => {
//   var newPet = PetService.add({ type: "Shark" });
//   var newService = ResourseService.add({ type: "service##" });
//   newUser = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
//   const walker = await WalkerService.add({
//     userId: user.id,
//   });
//   return request(app)
//     .post(`${MAIN_ROUTE}`)
//     .send({ pets: [newPet.id], serviceId = newService.id, userId: newUser.id, walkerId:  walker.id,date: "30-12-2021"})
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.id).toBe(event.id);
//     });
// });

// describe("Test #33.1 - Create new event with erros ...", () => {
//   var newPet = PetService.add({ type: "Foca" });
//   var newService = ResourseService.add({ type: "service###" });
//   newUser = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
//   userIdToGet = newUser.id;
//   const walker = await WalkerService.add({
//     userId: user.id,
//   });
//   walkerIdToGet = walker.id;
//   const testTemplate = (data, errorMessage) => {
//     return request(app)
//       .post(MAIN_ROUTE)
//       .send(data)
//       .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body.error).toBe(errorMessage);
//       });
//   };

//   test("Test #33.1.1 - Create new event without pets", () => {
//     testTemplate({ pets: [], serviceId = newService.id, userId: newUser.id, walkerId:  walker.id,date: "30-12-2021"}, "The pets field is required");
//   });
//   test("Test #33.1.2 -  Create new event without service", () => {
//     testTemplate({ pets: [newPet.id], serviceId = null, userId: newUser.id, walkerId:  walker.id,date: "30-12-2021"}, "The service field is required");
//   });
//   test("Test #33.1.3 - Create new event without user", () => {
//     testTemplate({ pets: [newPet.id], serviceId = newService.id, userId: null, walkerId:  walker.id,date: "30-12-2021"}, "The userId field is required");
//   });
//   test("Test #33.1.4 - Create new event without walker", () => {
//     testTemplate({ pets: [newPet.id], serviceId = newService.id, userId: newUser.id, walkerId:  null,date: "30-12-2021"}, "The walkerId field is required");
//   });
//   test("Test #33.1.4 - Create new event without date", () => {
//     testTemplate({ pets: [newPet.id], serviceId = newService.id, userId: newUser.id, walkerId:  null,date: "30-12-2021"}, "The date field is required");
//   });
//   test("Test #33.1.4 - Create new event with the date less than today", () => {
//     testTemplate({ pets: [newPet.id], serviceId = newService.id, userId: newUser.id, walkerId:  null,date: "12-12-2021"}, "The date field is wrong");
//   });
// });

// test("Test #34 - Get all events by user", () => {
//   return request(app)
//     .get(`${MAIN_ROUTE}/${userIdToGet}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// test("Test #35 -  Get all events by walker", () => {
//   return request(app)
//     .get(`${MAIN_ROUTE}/${walkerIdToGet}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// test("Test #36 - Update event status", () => {
//   var newPet = PetService.add({ type: "Shark" });
//   var newService = ResourseService.add({ type: "service##" });
//   newUser = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
//   const walker = await WalkerService.add({
//     userId: user.id,
//   });
//   const event = EventService.add({pets: [newPet.id], serviceId = newService.id, userId: newUser.id, walkerId:  walker.id})
//   return request(app)
//     .put(`${MAIN_ROUTE}/${event.id}`)
//     .send({statusId:1})
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("userId");
//     });
// });

// test("Test #37 -  Get single event by id", () => {
//   var newPet = PetService.add({ type: "Shark" });
//   var newService = ResourseService.add({ type: "service##" });
//   newUser = await UserService.add({
//     email: `${Date.now()}@ipca.pt`,
//     password: "test€€€€",
//     userData: {},
//   });
//   const walker = await WalkerService.add({
//     userId: user.id,
//   });
//   const event = EventService.add({pets: [newPet.id], serviceId = newService.id, userId: newUser.id, walkerId:  walker.id})
//   return request(app)
//     .get(`${MAIN_ROUTE}/${event.id}`)
//     .set("authorization", `bearer ${user.token}`)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });
