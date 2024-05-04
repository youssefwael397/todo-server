"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController_js_1 = require("../controllers/homeController.js");
const router = (0, express_1.Router)();
router.get('/', homeController_js_1.HomeController.helloWorld);
exports.default = router;
