const express = require("express");
const {
  getUser
} = require("../controllers/user");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();

router.get("/profile", getAccessToRoute, getUser);
module.exports = router;
