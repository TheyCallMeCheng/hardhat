// tslint:disable-next-line:no-implicit-dependencies
import { ethers } from "ethers";

import { IEthereumProvider } from "../../../../src/types";

// This class has been copied from @nomiclabs/hardhat-ethers package to avoid circular dependency

export class EthersProviderWrapper extends ethers.providers.JsonRpcProvider {
  private readonly _hardhatProvider: IEthereumProvider;

  constructor(hardhatProvider: IEthereumProvider) {
    super();
    this._hardhatProvider = hardhatProvider;
  }

  public async send(method: string, params: any): Promise<any> {
    const result = await this._hardhatProvider.send(method, params);

    // We replicate ethers' behavior.
    this.emit("debug", {
      action: "send",
      request: {
        id: 42,
        jsonrpc: "2.0",
        method,
        params,
      },
      response: result,
      provider: this,
    });

    return result;
  }
}
