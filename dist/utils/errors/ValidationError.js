"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(validationErrors) {
        super('Validation error');
        this.name = 'ValidationError';
        this.validationErrors = validationErrors;
    }
    static handleValidationError(error, res) {
        if (error) {
            const validationErrors = {};
            error.details.forEach((detail) => {
                var _a, _b;
                validationErrors[(_b = (_a = detail.context) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : ''] = detail.message;
            });
            throw new ValidationError(validationErrors);
        }
    }
}
exports.default = ValidationError;
