const { authenticate } = require("../middlewares");
const passport = require("passport");

describe("test authenticate mw", () => {
  const user = { token: "111111" };
  const req = { user };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();
  test("token is valid", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => {
        cb(null, user);
      }
    );
    authenticate(req, res, next);
    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalledTimes(1);
  });
  test("token is not exist", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => {
        cb(null, false);
      }
    );

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  });
  test("token is not valid", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => {
        cb(null, { token: "2222" });
      }
    );

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  });
});
