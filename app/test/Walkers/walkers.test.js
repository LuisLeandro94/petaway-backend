const request = require("supertest");
const app = require("~app");
const UserService = require("~service").User;
const WalkerService = require("~service").Walker;
const PetService = require("~service").Pet;
const ResourseService = require("~service").Resourse;
const MAIN_ROUTE = "/v1/walkers";
const LOGIN_ROUTE = "v1/auth/signin";

beforeAll(async () => {
  user = await UserService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {},
  });
});

test("Test #25 - Doing login", () => {
  return request(app)
    .post(LOGIN_ROUTE)
    .send({ email: user.email, password: user.password })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
});

test("Test #26 - Get all walkers", () => {
  return request(app)
    .get(MAIN_ROUTE)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Test #27 - Get single walker by id", () => {
  const walker = await WalkerService.add({
    userId: user.id,
  });
  return request(app)
    .get(`${MAIN_ROUTE}/${walker.id}`)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(walker.id);
    });
});

test("Test #28 - Update walker service and pets", () => {
  var newPet = PetService.add({ type: "Dog" });
  var newService = ResourseService.add({ type: "service123" });

  return request(app)
    .put(`${MAIN_ROUTE}/${walker.id}`)
    .send({ pets: [newPet.id], services: [newService.id] })
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(walker.id);
    });
});

test("Test #29 - Remove walker", () => {
  const walker = await WalkerService.add({
    userId: user.id,
  });
  return request(app)
    .delete(`${MAIN_ROUTE}/${walker.id}`)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(walker.id);
    });
});
