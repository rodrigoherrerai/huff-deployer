import { Contract, Signer } from "ethers";
import { ProviderWrapper } from "hardhat/internal/core/providers/wrapper";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CompilerArg, deploy } from "./helpers";

/**
 * HuffDeployer - Hardhat plugin for deploying Huff contracts.
 */
export class HuffDeployer {
  constructor(public hre: HardhatRuntimeEnvironment) {}

  /**
   * Deploys a huff contract.
   *
   * @param targetContract The name of the huff contract to deploy.
   * @param constructorArgs The constructor arguments for the contract.
   * @param compilerArgs Optionally specify arguments to pass to the huff compiler
   * @param signer The signer to use for the deployment.
   *               It left undefined, the signer 0 from Hardhat will be used.
   *
   * @returns The deployed contract or throws an Error.
   */
  public async deploy(
    targetContract: string,
    generateSolidityInterface?: boolean,
    constructorArgs?: any[],
    compilerArgs?: CompilerArg[],
    signer?: Signer
  ): Promise<Contract> {
    if (signer === undefined) {
      const signers = await this.hre.ethers.getSigners();
      signer = signers[0];
    }

    const generateInterface = generateSolidityInterface
      ? generateSolidityInterface
      : false;

    return deploy.bind(this)(
      targetContract,
      signer,
      generateInterface,
      constructorArgs,
      compilerArgs
    );
  }
}
