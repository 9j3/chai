"use strict";
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
exports.ChatGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var ChatGateway = /** @class */ (function () {
    function ChatGateway() {
        this.users = {};
        this.userid = {};
        this.ctr = 0;
    }
    /**
     * Handles the disconnect of a specific user and emits an event to all other users
     * @param client
     */
    ChatGateway.prototype.handleDisconnect = function (client) {
        // user is offline
        client.broadcast.emit("user ".concat(this.users[client.id], " left the channel"));
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ChatGateway.prototype.handleConnection = function (client) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.users[client.id] = ++this.ctr;
        this.userid.push(client.id);
        // broadcast (user is online)
        client.broadcast.emit("user ".concat(this.users[client.id], " joined the channel"));
        // send message only to new user
        this.wss
            .to(this.userid[this.ctr - 1])
            .emit("Welcome To the chai chat user ".concat(this.ctr));
    };
    /**
     * Hook called after server is initialised
     * @param server
     */
    ChatGateway.prototype.afterInit = function (server) {
        console.log('Initialised');
    };
    /**
     * Handler when a message is sent
     * @param client
     * @param data
     */
    ChatGateway.prototype.handleMessage = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.wss.emit('chat', "message from user ".concat(this.users[client.id], " ==>> ").concat(data));
                return [2 /*return*/];
            });
        });
    };
    /**
     * event handler when new user joins
     * @param client
     * @param room
     */
    ChatGateway.prototype.handleJoinRoom = function (client, room) {
        client.join(room);
        client.broadcast.to(room).emit("".concat(this.users[client.id], " joined ").concat(room));
    };
    /**
     * event handler when specific user disconnects
     * @param client
     * @param room
     */
    ChatGateway.prototype.handleLeaveRoom = function (client, room) {
        client.leave(room);
        client.broadcast.to(room).emit("".concat(this.users[client.id], " left ").concat(room));
    };
    __decorate([
        (0, websockets_1.WebSocketServer)()
    ], ChatGateway.prototype, "wss");
    __decorate([
        (0, websockets_1.SubscribeMessage)('chat')
    ], ChatGateway.prototype, "handleMessage");
    __decorate([
        (0, websockets_1.SubscribeMessage)('joinRoom')
    ], ChatGateway.prototype, "handleJoinRoom");
    __decorate([
        (0, websockets_1.SubscribeMessage)('leaveRoom')
    ], ChatGateway.prototype, "handleLeaveRoom");
    ChatGateway = __decorate([
        (0, websockets_1.WebSocketGateway)({
            namespace: '/chat',
            cors: {
                origin: '*'
            }
        })
    ], ChatGateway);
    return ChatGateway;
}());
exports.ChatGateway = ChatGateway;
