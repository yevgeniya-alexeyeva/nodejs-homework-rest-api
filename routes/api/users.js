const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/users");
const { authenticate } = require("../../middlewares");

router.post("/signup", express.json(), ctrls.addUser);

router.post("/login", express.json(), ctrls.login);

router.patch("/logout", authenticate, express.json(), ctrls.logout);

router.get("/current", authenticate, ctrls.getCurrentUser);

router.patch(
  "/:id/subscription",
  authenticate,
  express.json(),
  ctrls.updateSubscription
);

module.exports = router;
