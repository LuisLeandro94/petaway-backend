const request = require("supertest");
const app = require("~app");
const _email = `${Date.now()}@petaway.pt`;
const MAIN_ROUTE = "/v1/auth/signup";

let user = {
  email: _email,
  password: "test€€€",
  firstName: "Dog",
  lastName: "Semedo",
  postalCode: "4845-024",
};

test("Test #5 - Doing signup", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send(user)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email");
    });
});

describe("Test #6 - Doing signup with erros ...", () => {
  const testTemplate = (data, errorMessage) => {
    return request(app)
      .post(MAIN_ROUTE)
      .send(data)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test("Test #6.1 - SignUp without firstName", () => {
    user.firstName = null;
    testTemplate(user, "The firstName field is required");
  });
  test("Test #6.2 - SignUp without lastName", () => {
    user.lastName = null;
    testTemplate(user, "The lastName field is required");
  });
  test("Test #6.3 - SignUp without postalCode", () => {
    user.postalCode = null;
    testTemplate(user, "The postalCode field is required");
  });
  test("Test #6.4 - SignUp without password", () => {
    user.password = null;
    testTemplate(user, "The password field is required");
  });
  test("Test #6.5 - SignUp without email", () => {
    user.email = null;
    testTemplate(user, "The email field is required");
  });
  test("Test #6.6 - Email duplicated", () => {
    user.email = null;
    testTemplate(user, "Email duplicated");
  });
});


