// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";

const { getContractAddress } = require("@ethersproject/address");

import { useEnvironment } from "./helpers";

describe("HuffDeployer", function () {
  useEnvironment("hardhat-project");

  describe("SimpleStore", function () {
    it("should correctly deploy", async function () {
      const contract = await this.hre.huffDeployer.deploy("SimpleStore");
      assert(contract.address);
    });

    it("should update the value", async function () {
      const simpleStore = await this.hre.huffDeployer.deploy("SimpleStore");

      const value = await simpleStore.getValue();
      assert(value.eq(0));

      await simpleStore.setValue(10);
      assert((await simpleStore.getValue()).eq(10));
    });
  });

  describe("Addition", function () {
    it("should correctly deploy", async function () {
      const addition = await this.hre.huffDeployer.deploy("Addition");
      assert(addition.address);
    });

    it("should add two numbers", async function () {
      const addition = await this.hre.huffDeployer.deploy("Addition");

      const result = await addition.addTwo(111, 111);
      assert(result.eq(222));
    });
  });

  describe("Owned", function () {
    it("should correctly deploy", async function () {
      const [owner] = await this.hre.ethers.getSigners();
      const owned = await this.hre.huffDeployer.deploy("Owned", false, [
        owner.address,
      ]);
      assert(owned.address);
    });

    it("should set a new owner", async function () {
      const [owner] = await this.hre.ethers.getSigners();
      const owned = await this.hre.huffDeployer.deploy("Owned", false, [
        owner.address,
      ]);

      assert((await owned.owner()) === owner.address);

      const newOwner = this.hre.ethers.Wallet.createRandom().address;

      await owned.setOwner(newOwner);

      assert((await owned.owner()) === newOwner);
    });
  });
});
