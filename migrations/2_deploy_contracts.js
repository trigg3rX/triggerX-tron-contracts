const TronLayerZeroSender = artifacts.require("TronLayerZeroSender");

module.exports = function(deployer) {
  console.log("innnnnnnnnnnnnnnnnnnnn");
  deployer.deploy(TronLayerZeroSender).then(async () => {
    const instance = await TronLayerZeroSender.deployed();
    const lzEndpoint = '0x1b356f3030CE0c1eF9D3e1E250Bf0BB11D81b2d1';  // LayerZero Endpoint address for Tenet testnet
    const destChainId = 17000;  // Destination chain ID (e.g., 5 for Goerli testnet)
    const destAddr = '0xa0A5e78A910C729a92aA9A8C94a6636889ADC6ad';  // Destination contract address on Ethereum (hex encoded)
    await instance.initialize(lzEndpoint, destChainId, destAddr);
  });
};
