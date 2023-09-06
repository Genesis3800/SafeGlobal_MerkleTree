"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.generateMerkleTree = void 0;
var merkletreejs_1 = require("merkletreejs");
var utils_1 = require("ethers/lib/utils");
function generateMerkleTree() {
    var whitelist = [
        "randomEmail_1_@gmail.com",
        "randomEmail_2_@gmail.com",
        "randomEmail_3_@gmail.com",
    ];
    // Leaves are the actual data points that make up a Merkle Tree
    var leaves = whitelist.map(function (email) { return (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)(email)); });
    var merkleTree = new merkletreejs_1.MerkleTree(leaves, utils_1.keccak256, { sortPairs: true });
    var root = merkleTree.getHexRoot();
    console.log("The Merkle Root is:", root);
    console.log("Printing the whole Merkle tree:", merkleTree.toString());
    return merkleTree;
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
    var tree = generateMerkleTree();
    var emailToVerify = "randomEmail_1_@gmail.com";
    if (verifyEmail(emailToVerify, tree)) {
        console.log("".concat(emailToVerify, " is part of the tree."));
    }
    else {
        console.log("".concat(emailToVerify, " is NOT part of the tree."));
    }
}
main();
