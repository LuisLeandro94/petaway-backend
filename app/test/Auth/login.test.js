const request = require("supertest");
const app = require("~app");
const MAIN_ROUTE = "v1/auth/signin";

let user;
beforeAll(async () => {
  user = await userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {},
  });
});

test("Test #1 - Doing login", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ email: user.email, password: user.password })
    .then((res) => {
      user.jwt = res.body.token;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
});

test("Test #2 - Doing login with wrong user", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ email: concat(user.email, "not_yet"), password: user.password })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid authentication! #1");
    });
});

test("Test #3 - Protected routes", () => {
  return request(app)
    .get("/v1/users")
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test("Test #4 - Token Expired", () => {
  user.jwt = jwt.newToken();
  return request(app)
    .get("/v1/users")
    .set("authorization", `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid authentication! #2");
    });
});
