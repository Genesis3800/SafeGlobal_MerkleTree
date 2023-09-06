# Merkle Trees: what, why and how?

Merkle Trees are basically an inspired take on Binary Trees, a foundational data structure in computer science.
What sets Merkle Trees apart is their unique ability to verify the integrity of large data sets without revealing or storing the underlying data.
Additionally, they excel in facilitating rapid data lookups.

This is possible because of the way Merkle Trees are structured. They leverage cryptographic hashing to create a unique hash for each node in the tree. Each hash is unique but equal in length.
This consistent uniqueness means no hash can be used to identify the data it represents, but can be used to verify its' integrity.

This was a whole lot of jargon. Let us take a step back and take a closer look at the underlying cryptographic magic that makes all of this possible.

## Hashing functions

A function is anything that provides a consistent output for a given input. For example, consider simple addition. The addition function will always produce the output `5` for given inputs `2` and `3`.

Keccak256 is one of many cryptographic hash functions in use today. It is a one-way function, meaning it is easy to compute the output for a given input, but impossible to compute the input for a given output. This is what makes it so useful for cryptography.
The Ethereum blockchain as a whole relies on Keccak256 for its' security.

The main point of interest for us is that Keccak256 produces a unique 256-bit/32-byte/64-hexadecimal-character hash for each input. This means that no two inputs can produce the same output. This is called collision resistance.

<p align="center">
  <img src="images/1.png" style="border-radius: 20px">
</p>

>📝  **Note:**
> You could build a Merkle Tree using any hashing function of your choice, but we will be using Keccak256 for this tutorial.

## What will we be building?

In this tutorial we will be be building a Merkle Tree built using three Email addresses. We will then use this Merkle Tree to prove that a given Email address is part of the tree without revealing the other Email addresses.

To get started:

1. Open your terminal in a new directory where you want to create your project.
2. Run `npm init -y` to initialize a new Node.js project.
3. Install Typescript as a dev dependency by running `npm install --save-dev typescript`.
4. Create a `tsconfig.json`file and fill it with the following data:
 
```json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es2020", "dom"],
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

5. Create a `src` directory in the root of your project, and a `MerkleTree_Implementation.ts` file inside it. Paste this simple console log into the file:

```typescript
    console.log("Hello from Merkle Tree!");
```

6. Inside the `package.json` file, add the following line to the `scripts` object:

```json
    "scripts": {
        "start": "tsc && node src/MerkleTree_Implementation.js"
    }
``` 

7. Run npm start to start a node process. If everything was done correctly, you should see the console statement printed in the terminal.

8. Run  `npm install merkletreejs` and `npm install ethers@5.7.2` to install the MerkleTree.js and ethers.js libraries respectively.
We will also need the `@types/node` to work with the different types of data we will be using. Run `npm install --save-dev @types/node` to install it as a dev dependency.

## Constructing our Merkle Tree

Inside `MerkleTree_Implementation.ts`, import the `MerkleTree` and `keccak256` functions from the libraries we just installed. We also need to import the `toUtf8Bytes` function from ethers.js to convert string data to bytes.
This is because the keccak256 function only accepts bytes as an input.

```typescript
import { MerkleTree } from 'merkletreejs'
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
```

Next, declare a function that returns a Merkle Tree. We will be using this function to construct our Merkle Tree.

```typescript
export async function generateMerkleTree(): Promise<MerkleTree> {

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
```

Let us break down what is happening here:

1. We declare an array of Email addresses called `whitelist`. This is the data we will be using to construct our Merkle Tree.
2. The `map` function allows us to map each element of the `whitelist` array to a new array called `leaves`. This new array contains the hashed version of each Email address.
3. We then use the `MerkleTree` constructor to create a new Merkle Tree. The constructor takes three arguments:
    - `leaves`: The array of hashed Email addresses we just created.
    - `keccak256`: The hashing function we will be using to hash our data.
    - `{sortPairs: true}`: This is an optional argument that sorts the leaves and pairs them together. This is necessary for the Merkle Tree to work.