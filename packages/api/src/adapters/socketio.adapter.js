"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.SocketIoAdapter = void 0;
var shared_utils_1 = require("@nestjs/common/utils/shared.utils");
var websockets_1 = require("@nestjs/websockets");
var constants_1 = require("@nestjs/websockets/constants");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var socket_io_1 = require("socket.io");
var SocketIoAdapter = /** @class */ (function (_super) {
    __extends(SocketIoAdapter, _super);
    /**
     *
     * @param appOrHttpServer
     * @param corsOrigins
     */
    function SocketIoAdapter(appOrHttpServer, corsOrigins) {
        if (corsOrigins === void 0) { corsOrigins = ['localhost']; }
        var _this = _super.call(this, appOrHttpServer) || this;
        _this.corsOrigins = corsOrigins;
        return _this;
    }
    /**
     *
     * @param port
     * @param options
     */
    SocketIoAdapter.prototype.create = function (port, options) {
        if (!options) {
            return this.createIOServer(port);
        }
        var namespace = options.namespace, server = options.server, opt = __rest(options, ["namespace", "server"]);
        return server && (0, shared_utils_1.isFunction)(server.of)
            ? server.of(namespace)
            : namespace
                ? this.createIOServer(port, opt).of(namespace)
                : this.createIOServer(port, opt);
    };
    /**
     *
     * @param port
     * @param options
     */
    SocketIoAdapter.prototype.createIOServer = function (port, options) {
        if (this.httpServer && port === 0) {
            return new socket_io_1.Server(this.httpServer, {
                cors: {
                    origin: this.corsOrigins,
                    methods: ['GET', 'POST'],
                    credentials: true
                },
                // Allow 1MB of data per request.
                maxHttpBufferSize: 1e6
            });
        }
        return new socket_io_1.Server(port, options);
    };
    /**
     *
     * @param client
     * @param handlers
     * @param transform
     */
    SocketIoAdapter.prototype.bindMessageHandlers = function (client, handlers, transform) {
        var _this = this;
        var disconnect$ = (0, rxjs_1.fromEvent)(client, constants_1.DISCONNECT_EVENT).pipe((0, operators_1.share)(), (0, operators_1.first)());
        handlers.forEach(function (_a) {
            var message = _a.message, callback = _a.callback;
            var source$ = (0, rxjs_1.fromEvent)(client, message).pipe((0, operators_1.mergeMap)(function (payload) {
                var _a = _this.mapPayload(payload), data = _a.data, ack = _a.ack;
                return transform(callback(data, ack)).pipe((0, operators_1.filter)(function (response) { return !(0, shared_utils_1.isNil)(response); }), (0, operators_1.map)(function (response) { return [response, ack]; }));
            }), (0, operators_1.takeUntil)(disconnect$));
            source$.subscribe(function (_a) {
                var response = _a[0], ack = _a[1];
                if (response.event) {
                    return client.emit(response.event, response.data);
                }
                (0, shared_utils_1.isFunction)(ack) && ack(response);
            });
        });
    };
    /**
     *
     * @param payload
     */
    SocketIoAdapter.prototype.mapPayload = function (payload) {
        if (!Array.isArray(payload)) {
            return { data: payload };
        }
        var lastElement = payload[payload.length - 1];
        var isAck = (0, shared_utils_1.isFunction)(lastElement);
        if (isAck) {
            var size = payload.length - 1;
            return {
                data: size === 1 ? payload[0] : payload.slice(0, size),
                ack: lastElement
            };
        }
        return { data: payload };
    };
    return SocketIoAdapter;
}(websockets_1.AbstractWsAdapter));
exports.SocketIoAdapter = SocketIoAdapter;
