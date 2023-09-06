import { MerkleTree } from "merkletreejs";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";

export function generateMerkleTree(): MerkleTree {

  let whitelist = [
    "randomEmail_1_@gmail.com",
    "randomEmail_2_@gmail.com",
    "randomEmail_3_@gmail.com",
  ];

  // Leaves are the actual data points that make up a Merkle Tree
  const leaves = whitelist.map((email) => keccak256(toUtf8Bytes(email)));

  const merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true});

  const root = merkleTree.getHexRoot();

  console.log("The Merkle Root is:", root);
  console.log("Printing the whole Merkle tree:", merkleTree.toString());

  return merkleTree;
}

export function verifyEmail(email: string, tree: MerkleTree): boolean {

  // Convert the email to its hashed form
  const leaf = keccak256(toUtf8Bytes(email));

  // Get the Merkle Proof for the email
  const proof = tree.getHexProof(leaf);

  // Verify the proof
  const isValid = tree.verify(proof, leaf, tree.getHexRoot());

  return isValid;
}

function main() {

  const tree = generateMerkleTree();
  const emailToVerify = "randomEmail_1_@gmail.com";

  if (verifyEmail(emailToVerify, tree)) {
    console.log(`${emailToVerify} is part of the tree.`);
  } else {
    console.log(`${emailToVerify} is NOT part of the tree.`);
  }
}

main();
