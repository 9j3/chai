"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RefreshRequest = exports.RegisterRequest = exports.LoginRequest = void 0;
var class_validator_1 = require("class-validator");
var LoginRequest = /** @class */ (function () {
    function LoginRequest() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'A username is required' })
    ], LoginRequest.prototype, "username");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'A password is required to login' })
    ], LoginRequest.prototype, "password");
    return LoginRequest;
}());
exports.LoginRequest = LoginRequest;
var RegisterRequest = /** @class */ (function () {
    function RegisterRequest() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'A username is required' })
    ], RegisterRequest.prototype, "username");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'A password is required' }),
        (0, class_validator_1.MinLength)(6, { message: 'Your password must be at least 6 characters' })
    ], RegisterRequest.prototype, "password");
    return RegisterRequest;
}());
exports.RegisterRequest = RegisterRequest;
var RefreshRequest = /** @class */ (function () {
    function RefreshRequest() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'The refresh token is required' })
    ], RefreshRequest.prototype, "refresh_token");
    return RefreshRequest;
}());
exports.RefreshRequest = RefreshRequest;
