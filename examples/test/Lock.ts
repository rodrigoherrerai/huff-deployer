import { expect } from "chai";
import { ethers } from "hardhat";

import { huffDeployer } from "hardhat";

describe("Owned", () => {
  it("should change the owner", async () => {
    const [owner, newOwner] = await ethers.getSigners();

    const owned = await huffDeployer.deploy("Owned", [owner.address]); // <--- Deploy the contract
    expect(await owned.owner()).to.equal(owner.address);

    await owned.setOwner(newOwner.address);
    expect(await owned.owner()).to.equal(newOwner.address);
  });
});
