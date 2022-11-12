import "@nomiclabs/hardhat-ethers";
import { extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import path from "path";

import { HuffDeployer } from "./HuffDeployer";
import "./type-extensions";

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.huffDeployer = lazyObject(() => new HuffDeployer(hre));
});
