const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/contacts");
const { authenticate } = require("../../middlewares");
console.log(authenticate);
router.get("/", authenticate, ctrls.listContacts);

router.get("/:contactId", authenticate, ctrls.getContactById);

router.post("/", authenticate, express.json(), ctrls.addContact);

router.delete("/:contactId", authenticate, ctrls.removeContact);

router.put("/:contactId", authenticate, express.json(), ctrls.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  express.json(),
  ctrls.addToFavorite
);

module.exports = router;
