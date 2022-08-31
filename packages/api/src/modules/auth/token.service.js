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
exports.TokensService = void 0;
var common_1 = require("@nestjs/common");
var jsonwebtoken_1 = require("jsonwebtoken");
var BASE_OPTIONS = {
    issuer: 'https://example.tekoproject.local',
    audience: 'chai-vue-frontend'
};
var TokensService = /** @class */ (function () {
    /**
     *
     * @param tokens
     * @param users
     * @param jwt
     */
    function TokensService(tokens, users, jwt) {
        this.tokens = tokens;
        this.users = users;
        this.jwt = jwt;
    }
    /**
     *
     * @param user
     */
    TokensService.prototype.generateAccessToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var opts;
            return __generator(this, function (_a) {
                opts = __assign(__assign({}, BASE_OPTIONS), { subject: String(user.userId) });
                return [2 /*return*/, this.jwt.sign({}, opts)];
            });
        });
    };
    /**
     *
     * @param user
     * @param expiresIn
     */
    TokensService.prototype.generateRefreshToken = function (user, expiresIn) {
        var token = this.tokens.createRefreshToken(user, expiresIn);
        var opts = __assign(__assign({}, BASE_OPTIONS), { expiresIn: expiresIn, subject: String(user.userId), jwtid: String(token.id) });
        return this.jwt.signAsync({}, opts);
    };
    /**
     *
     * @param encoded
     */
    TokensService.prototype.resolveRefreshToken = function (encoded) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.decodeRefreshToken(encoded)];
                    case 1:
                        payload = _a.sent();
                        return [4 /*yield*/, this.getStoredTokenFromRefreshTokenPayload(payload)];
                    case 2:
                        token = _a.sent();
                        if (!token) {
                            throw new common_1.UnprocessableEntityException('Refresh token not found');
                        }
                        if (token.is_revoked) {
                            throw new common_1.UnprocessableEntityException('Refresh token revoked');
                        }
                        return [4 /*yield*/, this.getUserFromRefreshTokenPayload(payload)];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnprocessableEntityException('Refresh token malformed');
                        }
                        return [2 /*return*/, { user: user, token: token }];
                }
            });
        });
    };
    /**
     *
     * @param refresh
     */
    TokensService.prototype.createAccessTokenFromRefreshToken = function (refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveRefreshToken(refresh)];
                    case 1:
                        user = (_a.sent()).user;
                        return [4 /*yield*/, this.generateAccessToken(user)];
                    case 2:
                        token = _a.sent();
                        return [2 /*return*/, { user: user, token: token }];
                }
            });
        });
    };
    /**
     *
     * @param token
     * @private
     */
    TokensService.prototype.decodeRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.jwt.verifyAsync(token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof jsonwebtoken_1.TokenExpiredError) {
                            throw new common_1.UnprocessableEntityException('Refresh token expired');
                        }
                        else {
                            throw new common_1.UnprocessableEntityException('Refresh token malformed');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param payload
     * @private
     */
    TokensService.prototype.getUserFromRefreshTokenPayload = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var subId;
            return __generator(this, function (_a) {
                subId = payload.sub;
                if (!subId) {
                    throw new common_1.UnprocessableEntityException('Refresh token malformed');
                }
                return [2 /*return*/, this.users.find('userId', subId)];
            });
        });
    };
    /**
     *
     * @param payload
     * @private
     */
    TokensService.prototype.getStoredTokenFromRefreshTokenPayload = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenId;
            return __generator(this, function (_a) {
                tokenId = String(payload.jti);
                if (!tokenId) {
                    throw new common_1.UnprocessableEntityException('Refresh token malformed');
                }
                return [2 /*return*/, this.tokens.findTokenById(tokenId)];
            });
        });
    };
    TokensService = __decorate([
        (0, common_1.Injectable)()
    ], TokensService);
    return TokensService;
}());
exports.TokensService = TokensService;
