"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bcrypt = void 0;
const bcrypt = __importStar(require("bcrypt"));
class Bcrypt {
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, Bcrypt.saltRounds, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    resolve(undefined);
                }
                else {
                    console.log('hashed password:', hash);
                    resolve(hash);
                }
            });
        });
    }
    static comparePasswords(password, saved_password) {
        return bcrypt.compare(password, saved_password);
    }
}
exports.Bcrypt = Bcrypt;
Bcrypt.saltRounds = 10;
