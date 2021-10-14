"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
Object.defineProperty(exports, "__esModule", { value: true });
var protocol_js_1 = require("@aave/protocol-js/");
var graphql_request_1 = require("graphql-request");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var v1Endpoint, v2Endpoint, v1GraphQLClient, v2GraphQLClient, userAddress, v1PoolReservesDataQuery, v1RawUserReservesQuery, v2PoolReservesDataQuery, v2RawUserReservesQuery, ethPriceUSDQuery, handleError, v1PoolReservesData, v1RawUserReserves, v2PoolReservesData, v2RawUserReserves, ethPriceUSD, v1UserSummary, rewardsInfo, v2UserSummary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    v1Endpoint = "https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw";
                    v2Endpoint = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";
                    v1GraphQLClient = new graphql_request_1.GraphQLClient(v1Endpoint, { headers: {} });
                    v2GraphQLClient = new graphql_request_1.GraphQLClient(v2Endpoint, { headers: {} });
                    userAddress = "0x583E76FFb9b25129E1b26CA4F7F873Dae8093E26";
                    v1PoolReservesDataQuery = (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    {\n      reserves(where: { isActive: true }) {\n        ...ReserveData\n      }\n    }\n  "], ["\n    {\n      reserves(where: { isActive: true }) {\n        ...ReserveData\n      }\n    }\n  "])));
                    v1RawUserReservesQuery = (0, graphql_request_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    {\n      userReserves(where: { user: userAddress }) {\n        ...UserReserveData\n      }\n    }\n  "], ["\n    {\n      userReserves(where: { user: userAddress }) {\n        ...UserReserveData\n      }\n    }\n  "])));
                    v2PoolReservesDataQuery = (0, graphql_request_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    {\n      reserves(where: { isActive: true }) {\n        ...ReserveData\n      }\n    }\n  "], ["\n    {\n      reserves(where: { isActive: true }) {\n        ...ReserveData\n      }\n    }\n  "])));
                    v2RawUserReservesQuery = (0, graphql_request_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    {\n      userReserves(where: { user: userAddress }) {\n        ...UserReserveData\n      }\n    }\n  "], ["\n    {\n      userReserves(where: { user: userAddress }) {\n        ...UserReserveData\n      }\n    }\n  "])));
                    ethPriceUSDQuery = (0, graphql_request_1.gql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    {\n      priceOracle(id: \"1\") {\n        usdPriceEth\n      }\n    }\n  "], ["\n    {\n      priceOracle(id: \"1\") {\n        usdPriceEth\n      }\n    }\n  "])));
                    handleError = function (error) {
                        var errorMessage = "";
                        if (error.response) {
                            errorMessage =
                                "Received " +
                                    error.response.status +
                                    " error in AAVE Graph API response. Try refreshing data again.";
                        }
                        if (error.request) {
                            errorMessage =
                                "Received no response from AAVE Graph API request. Try refreshing data again.";
                        }
                        else {
                            errorMessage =
                                "AAVE Graph API Error, try refreshing data again. Message: " +
                                    error.message;
                        }
                        return [true, errorMessage];
                    };
                    v1PoolReservesData = new Array(), v1RawUserReserves = new Array(), v2PoolReservesData = new Array(), v2RawUserReserves = new Array(), ethPriceUSD = "";
                    return [4 /*yield*/, v1GraphQLClient
                            .request(v1PoolReservesDataQuery)
                            .then(function (data) {
                            v2PoolReservesData = data.data.reserves;
                        })
                            .catch(function (error) {
                            handleError(error);
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, v1GraphQLClient
                            .request(v1RawUserReservesQuery)
                            .then(function (data) {
                            v2RawUserReserves = data.data.userReserves;
                        })
                            .catch(function (error) {
                            handleError(error);
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, v2GraphQLClient
                            .request(v2PoolReservesDataQuery)
                            .then(function (data) {
                            v2PoolReservesData = data.data.reserves;
                        })
                            .catch(function (error) {
                            handleError(error);
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, v2GraphQLClient
                            .request(v2RawUserReservesQuery)
                            .then(function (data) {
                            v2RawUserReserves = data.data.userReserves;
                        })
                            .catch(function (error) {
                            handleError(error);
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, v2GraphQLClient
                            .request(ethPriceUSDQuery)
                            .then(function (data) {
                            ethPriceUSD = data.data.priceOracle.usdPriceEth;
                        })
                            .catch(function (error) {
                            handleError(error);
                        })];
                case 5:
                    _a.sent();
                    v1UserSummary = protocol_js_1.v1.formatUserSummaryData(v1PoolReservesData, v1RawUserReserves, userAddress.toLowerCase(), ethPriceUSD, Math.floor(Date.now() / 1000));
                    rewardsInfo = {};
                    v2UserSummary = protocol_js_1.v2.formatUserSummaryData(v2PoolReservesData, v2RawUserReserves, userAddress.toLowerCase(), ethPriceUSD, Math.floor(Date.now() / 1000), rewardsInfo);
                    console.log(v2UserSummary.healthFactor);
                    if (v1UserSummary.healthFactor == "-1") {
                        console.log("User has no outstanding debt positions in mainnet AAVE V1");
                    }
                    else {
                        console.log("Health factor V1: " + v1UserSummary.healthFactor);
                    }
                    if (v2UserSummary.healthFactor == "-1") {
                        console.log("User has no outstanding debt positions in mainnet AAVE V2");
                    }
                    else {
                        console.log("Health factor V2: " + v2UserSummary.healthFactor);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
