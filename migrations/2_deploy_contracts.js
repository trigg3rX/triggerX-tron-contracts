const SourceOApp = artifacts.require("SourceOApp");

module.exports = async function(deployer, network, accounts) {
  // Define the endpoint address
  const endpointAddress = '0x1b356f3030CE0c1eF9D3e1E250Bf0BB11D81b2d1'; // Replace with actual endpoint address

  // Deploy the contract with the endpoint address as a constructor argument
  await deployer.deploy(SourceOApp, endpointAddress);
  
  // Get the deployed contract instance
  const sourceOApp = await SourceOApp.deployed();
  
  console.log('SourceOApp deployed at:', sourceOApp.address);
  console.log('Endpoint address used:', endpointAddress);

  const destEid = '40217';//40161, 40217 (holesky)
  const peerAddress = '0xDFBBfe85c40ED1324Bb1a2730cC98f8289C2c825'; // contract add of dest cahin contract (receiver contract add)



  function hexToBytes32(hex) {
    // Remove the 0x prefix if present
    hex = hex.replace(/^0x/, '');

    // Ensure the string is 64 characters long (32 bytes)
    if (hex.length < 64) {
        hex = hex.padStart(64, '0');  // Pads with leading zeros
    }

    // Convert the hex string to a Buffer
    const bytes32 = '0x' + hex;
    return bytes32;
  }

  // Example usage
  // const hexAddress = "0xDC4DAfD93A3b2f1Fe7C995790F8B726bc0701C8c";
  const bytes32 = hexToBytes32(peerAddress);
  console.log("bytes32", bytes32);

  //I want to use setpeer function of the internal contract inside that i need two variables destEid and peerAddress in bytes32
  await sourceOApp.setPeer(destEid, bytes32);

  console.log('Peer set successfully');



};