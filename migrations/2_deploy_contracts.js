const TronLayerZeroSender = artifacts.require("TronLayerZeroSender");

module.exports = async function(deployer) {
  try {
    console.log("Deploying TronLayerZeroSender...");
    await deployer.deploy(TronLayerZeroSender);
    const instance = await TronLayerZeroSender.deployed();

    console.log("TronLayerZeroSender deployed at:", instance.address);

    // LayerZero Endpoint address for Tron testnet (Nile)
    // Make sure to replace this with the correct address for your network
    const lzEndpoint = '0x1b356f3030CE0c1eF9D3e1E250Bf0BB11D81b2d1';

    // Destination Endpoint ID (EID)
    // Replace this with the correct EID for your destination chain
    // For example, if you're sending to Ethereum Goerli, the EID might be different
    const destEid = "40217"; // This is an example, replace with the correct EID

    console.log("Initializing TronLayerZeroSender...");
    await instance.initialize(lzEndpoint, destEid);
    console.log("TronLayerZeroSender initialized successfully");

    // Optionally, you can set custom options here if needed
    // const customOptions = '0x...'; // Replace with your custom options
    // await instance.setOptions(customOptions);
    // console.log("Custom options set");

  } catch (error) {
    console.error("Deployment failed:", error);
  }
};