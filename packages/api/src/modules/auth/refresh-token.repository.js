"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RefreshTokensRepository = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var RefreshTokensRepository = /** @class */ (function () {
    function RefreshTokensRepository() {
        this.refreshTokens = [];
    }
    /**
     * Creates a refresh token and stores it in memory
     * @param user
     * @param ttl
     */
    RefreshTokensRepository.prototype.createRefreshToken = function (user, ttl) {
        // set the expiration date of the refresh token
        var expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);
        // create a new "mock" token
        var token = {
            id: (0, crypto_1.randomUUID)(),
            user_id: user.userId,
            is_revoked: false,
            expires: expiration
        };
        // store token in memory
        this.refreshTokens.push(token);
        return token;
    };
    /**
     *
     * @param id
     */
    RefreshTokensRepository.prototype.findTokenById = function (id) {
        return this.refreshTokens.find(function (rtkn) { return rtkn.id === id; });
    };
    RefreshTokensRepository = __decorate([
        (0, common_1.Injectable)()
    ], RefreshTokensRepository);
    return RefreshTokensRepository;
}());
exports.RefreshTokensRepository = RefreshTokensRepository;
