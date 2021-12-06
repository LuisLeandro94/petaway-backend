const request = require("supertest");
const app = require("~app");
const MAIN_ROUTE = "v1/auth/forgetPassword";

let user;
beforeAll(async () => {
  user = await userService.add({
    email: `${Date.now()}@ipca.pt`,
    password: "test€€€€",
    userData: {},
  });
});

test("Test #0 - Forget password", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ email: user.email, password: user.password })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
});

describe("Test #0.1 - Forget password with errors ...", () => {
  const testTemplate = (data, errorMessage) => {
    return request(app)
      .post(MAIN_ROUTE)
      .send(data)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test("Test #0.1.1 - Forget password without email", () => {
    testTemplate(
      { email: null, password: user.password },
      "The email field is required"
    );
  });
  test("Test #0.1.2 -  Forget password without password", () => {
    testTemplate(
        { email: user.email, password: null },
        "The password field is required"
    );
  });
});
