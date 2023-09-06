"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.verifyEmail = exports.generateMerkleTree = void 0;
var merkletreejs_1 = require("merkletreejs");
var utils_1 = require("ethers/lib/utils");
function generateMerkleTree() {
    return __awaiter(this, void 0, void 0, function () {
        var whitelist, leaves, merkleTree, root;
        return __generator(this, function (_a) {
            whitelist = [
                "randomEmail_1_@gmail.com",
                "randomEmail_2_@gmail.com",
                "randomEmail_3_@gmail.com",
            ];
            leaves = whitelist.map(function (email) { return (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)(email)); });
            merkleTree = new merkletreejs_1.MerkleTree(leaves, utils_1.keccak256, { sortPairs: true });
            root = merkleTree.getHexRoot();
            console.log("Keccak of 1 is ", (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("randomEmail_1_@gmail.com")));
            console.log("Keccak of 2 is ", (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("randomEmail_2_@gmail.com")));
            console.log("Keccak of 3 is ", (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("randomEmail_3_@gmail.com")));
            console.log("Merkle root:", root);
            console.log("Merkle tree:\n", merkleTree.toString());
            return [2 /*return*/, merkleTree];
        });
    });
}
exports.generateMerkleTree = generateMerkleTree;
function verifyEmail(email, tree) {
    // Convert the email to its hashed form
    var leaf = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)(email));
    // Get the Merkle Proof for the email
    var proof = tree.getHexProof(leaf);
    // Verify the proof
    var isValid = tree.verify(proof, leaf, tree.getHexRoot());
    return isValid;
}
exports.verifyEmail = verifyEmail;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tree, emailToVerify;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateMerkleTree()];
                case 1:
                    tree = _a.sent();
                    emailToVerify = "randomEmail_1_@gmail.com";
                    if (verifyEmail(emailToVerify, tree)) {
                        console.log("".concat(emailToVerify, " is part of the tree."));
                    }
                    else {
                        console.log("".concat(emailToVerify, " is NOT part of the tree."));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
