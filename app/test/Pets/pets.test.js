const request = require("supertest");
const app = require("~app");
const { PetService } = require("~service");
const MAIN_ROUTE = "/v1/pets";
const LOGIN_ROUTE = "v1/auth/signin";

beforeAll(async () => {
  user = await this.userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {},
  });
});

test("Test #8 - Doing login", () => {
  return request(app)
    .post(LOGIN_ROUTE)
    .send({ email: user.email, password: user.password })
    .then((res) => {
      user.jwt = res.body.token;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
});

test("Test #9 - Get All Pets with login", () => {
  await PetService.add({ type: "Dog" });
  return request(app)
    .get(MAIN_ROUTE)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});


test("Test #11 - Get All Pets without login", () => {
  const pet = await PetService.add({ type: "Dog" });
  return request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid authentication! #1");
    });
});

test("Test #10 - Get single Pet by id with login", () => {
  const pet = await PetService.add({ type: "Dog" });
  return request(app)
    .get(`${MAIN_ROUTE}/${pet.id}`)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.type).toBe("Dog");
    });
});

test("Test #12 - Get single Pet by id without login", () => {
  return request(app)
    .get(`${MAIN_ROUTE}/${1}`)
    .then((res) => {
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid authentication! #1");
    });
});



