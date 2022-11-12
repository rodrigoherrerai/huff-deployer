import "hardhat/types/config";
import "hardhat/types/runtime";

import { HuffDeployer } from "./HuffDeployer";

// declare module "hardhat/types/config" {
//   interface ProjectPaths {
//     newPath?: string;
//   }
// }

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    huffDeployer: HuffDeployer;
  }
}
