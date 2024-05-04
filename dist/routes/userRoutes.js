"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../controllers/userController.js");
const multerSetup_js_1 = require("../utils/multerSetup.js");
const router = (0, express_1.Router)();
// Define routes and connect them to controller methods
router.post('/register', multerSetup_js_1.MULTER_UPLOAD.none(), userController_js_1.UserController.createUser);
router.post('/login', multerSetup_js_1.MULTER_UPLOAD.none(), userController_js_1.UserController.login);
exports.default = router;
