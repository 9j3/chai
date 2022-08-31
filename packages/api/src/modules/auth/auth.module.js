"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthenticationModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var users_module_1 = require("../users/users.module");
var auth_controller_1 = require("./auth.controller");
var token_service_1 = require("./token.service");
var refresh_token_repository_1 = require("./refresh-token.repository");
var jwt_strategy_1 = require("./strategies/jwt.strategy");
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = __decorate([
        (0, common_1.Module)({
            imports: [
                jwt_1.JwtModule.register({
                    secret: 'secret',
                    signOptions: {
                        expiresIn: '5m'
                    }
                }),
                users_module_1.UsersModule,
            ],
            controllers: [auth_controller_1.AuthenticationController],
            providers: [jwt_strategy_1.JwtStrategy, token_service_1.TokensService, refresh_token_repository_1.RefreshTokensRepository]
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());
exports.AuthenticationModule = AuthenticationModule;
