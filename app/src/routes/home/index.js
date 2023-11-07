"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/profile", ctrl.output.profile);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/logout", ctrl.process.logout);
router.post("/profile", ctrl.process.profile);

module.exports = router;