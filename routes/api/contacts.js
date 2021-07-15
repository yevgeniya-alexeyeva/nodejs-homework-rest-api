const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers");

router.get("/", ctrls.listContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", express.json(), ctrls.addContact);

router.delete("/:contactId", ctrls.removeContact);

router.put("/:contactId", express.json(), ctrls.updateContact);

router.patch("/:contactId/favorite", express.json(), ctrls.addToFavorite);

module.exports = router;
