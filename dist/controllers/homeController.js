"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
class HomeController {
    static helloWorld(req, res, next) {
        let user = {
            haram: undefined,
        };
        res.json({ success: true, message: 'Hello World!' });
    }
}
exports.HomeController = HomeController;
