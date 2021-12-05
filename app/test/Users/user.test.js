const request = require("supertest");
const app = require("~app");
const UserService = require("~service").User;
const MAIN_ROUTE = "/v1/users";
const LOGIN_ROUTE = "v1/auth/signin";

beforeAll(async () => {
  user = await this.userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {},
  });
});

test("Test #20 - Doing login", () => {
  return request(app)
    .post(LOGIN_ROUTE)
    .send({ email: user.email, password: user.password })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
});

test("Test #21 - Get all users", () => {
  return request(app)
    .get(MAIN_ROUTE)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Test #22 - Get single user by id", () => {
  const user = await userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {
      firstName: "Dog",
      lastName: "Panado",
      postalCode: "4845-024",
    },
  });
  return request(app)
    .get(`${MAIN_ROUTE}/${user.id}`)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.lastName).toBe("Panado");
      expect(res.body.id).toBe(user.id);
    });
});

test("Test #23 - Update user", () => {
  const user = await userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {
      firstName: "Dog",
      lastName: "Panado",
      postalCode: "4845-024",
    },
  });
  user.userData.firstName = "cat";
  return request(app)
    .put(`${MAIN_ROUTE}/${user.id}`)
    .send(user)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe("cat");
      expect(res.body.id).toBe(user.id);
    });
});

test("Test #24 - Remove user", () => {
  const user = await userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {
      firstName: "Dog",
      lastName: "Panado",
      postalCode: "4845-024",
    },
  });
  user.userData.firstName = "cat";
  return request(app)
    .delete(`${MAIN_ROUTE}/${user.id}`)
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe("cat");
      expect(res.body.id).toBe(user.id);
    });
});
