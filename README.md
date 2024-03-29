# Huff-Deployer

A Hardhat Plugin To Test Huff Contracts

## Installation

```bash
npm install huff-deployer --save-dev
```

## Requirements

You need to have the Huff compiler (Rust version) installed in your machine. To install the compiler go to: https://github.com/huff-language/huff-rs

## Usage

Add the following to your `hardhat.config.js` file:

```js
require("huff-deployer");
```

If you are using TypeScript, add the following to your `hardhat.config.ts` file:

```ts
import "huff-deployer";
```

Then on your test file, import huffDeployer and deploy your Huff contract: 

```ts
import { expect } from "chai";
import { ethers } from "hardhat";

import { huffDeployer } from "hardhat";

describe("Owned", () => {
  it("should change the owner", async () => {
    const [owner, newOwner] = await ethers.getSigners();

    const owned = await huffDeployer.deploy("Owned", false,
    [owner.address]); // <--- Deploy the contract
    expect(await owned.owner()).to.equal(owner.address);

    await owned.setOwner(newOwner.address);
    expect(await owned.owner()).to.equal(newOwner.address);
  });
});
```


huffDeployer.deploy accepts 3 arguments: 

1. targetContract: The name of the Huff contract.
2. generateSolidityInterface (optional): Optionally generates a Solidity interface.
3. constructorArgs (optional): The constructor arguments. 
4. signer (optional): It will default to Hardhat's signer 0.

Check the [examples](https://github.com/rodrigoherrerai/huff-deployer/tree/main/examples) folder for a more comprehensive view. 

## License

MIT
