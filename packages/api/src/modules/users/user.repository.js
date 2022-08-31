"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersRepository = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
        this.users = [
            {
                userId: (0, crypto_1.randomUUID)(),
                username: 'bruno',
                fullName: 'Bruno Hammer',
                password: 'changeme'
            },
            {
                userId: (0, crypto_1.randomUUID)(),
                username: 'irene',
                fullName: 'Irene S. Mosig',
                password: 'secret'
            },
            {
                userId: (0, crypto_1.randomUUID)(),
                username: 'andi',
                fullName: 'Andreas Holzer',
                password: 'pw'
            },
        ];
    }
    /**
     *
     * @param property
     * @param id
     */
    UsersRepository.prototype.find = function (property, id) {
        return this.users.find(function (user) { return user[property] === id; });
    };
    /**
     *
     * @param property
     * @param id
     */
    UsersRepository.prototype.findMany = function () {
        return this.users;
    };
    /**
     *
     * @param username
     * @param password
     */
    UsersRepository.prototype.create = function (username, password) {
        var user = {
            username: username,
            password: password,
            userId: (0, crypto_1.randomUUID)()
        };
        this.users.push(user);
        return user;
    };
    UsersRepository = __decorate([
        (0, common_1.Injectable)()
    ], UsersRepository);
    return UsersRepository;
}());
exports.UsersRepository = UsersRepository;
