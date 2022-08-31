"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthenticationController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
var AuthenticationController = /** @class */ (function () {
    /**
     *
     * @param users
     * @param tokens
     */
    function AuthenticationController(users, tokens) {
        this.users = users;
        this.tokens = tokens;
    }
    /**
     *
     * @param body
     */
    AuthenticationController.prototype.register = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, refresh, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.users.createUserFromRequest(body)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.tokens.generateAccessToken(user)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30)];
                    case 3:
                        refresh = _a.sent();
                        payload = this.buildResponsePayload(user, token, refresh);
                        return [2 /*return*/, {
                                status: 'success',
                                data: payload
                            }];
                }
            });
        });
    };
    /**
     *
     * @param body
     */
    AuthenticationController.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, user, valid, _a, token, refresh, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = body.username, password = body.password;
                        return [4 /*yield*/, this.users.findForUsername(username)];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.users.validateCredentials(user, password)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = false;
                        _b.label = 4;
                    case 4:
                        valid = _a;
                        if (!valid) {
                            throw new common_1.UnauthorizedException('The login is invalid');
                        }
                        return [4 /*yield*/, this.tokens.generateAccessToken(user)];
                    case 5:
                        token = _b.sent();
                        return [4 /*yield*/, this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30)];
                    case 6:
                        refresh = _b.sent();
                        payload = this.buildResponsePayload(user, token, refresh);
                        return [2 /*return*/, {
                                status: 'success',
                                data: payload
                            }];
                }
            });
        });
    };
    /**
     *
     * @param body
     */
    AuthenticationController.prototype.refresh = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, token, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.tokens.createAccessTokenFromRefreshToken(body.refresh_token)];
                    case 1:
                        _a = _b.sent(), user = _a.user, token = _a.token;
                        payload = this.buildResponsePayload(user, token);
                        return [2 /*return*/, {
                                status: 'success',
                                data: payload
                            }];
                }
            });
        });
    };
    /**
     *
     * @param request
     */
    AuthenticationController.prototype.getUser = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.user.id;
                        return [4 /*yield*/, this.users.findForId(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                status: 'success',
                                data: user
                            }];
                }
            });
        });
    };
    /**
     *
     * @param user
     * @param accessToken
     * @param refreshToken
     * @private
     */
    AuthenticationController.prototype.buildResponsePayload = function (user, accessToken, refreshToken) {
        return {
            user: user,
            payload: __assign({ type: 'bearer', token: accessToken }, (refreshToken ? { refresh_token: refreshToken } : {}))
        };
    };
    __decorate([
        (0, common_1.Post)('/register'),
        __param(0, (0, common_1.Body)())
    ], AuthenticationController.prototype, "register");
    __decorate([
        (0, common_1.Post)('/login'),
        __param(0, (0, common_1.Body)())
    ], AuthenticationController.prototype, "login");
    __decorate([
        (0, common_1.Post)('/refresh'),
        __param(0, (0, common_1.Body)())
    ], AuthenticationController.prototype, "refresh");
    __decorate([
        (0, common_1.Get)('/profile'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, (0, common_1.Req)())
    ], AuthenticationController.prototype, "getUser");
    AuthenticationController = __decorate([
        (0, common_1.Controller)('/api/auth')
    ], AuthenticationController);
    return AuthenticationController;
}());
exports.AuthenticationController = AuthenticationController;
