const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers");

router.get("/", ctrls.listContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", express.json(), ctrls.addContact);

router.delete("/:contactId", ctrls.removeContact);

router.patch("/:contactId", express.json(), ctrls.updateContact);

module.exports = router;
