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

  const destEid = '40217';
  const peerAddress = '0x1b356f3030CE0c1eF9D3e1E250Bf0BB11D81b2d1'; // contract add of dest cahin contract (receiver contract add)
  //I want to use setpeer function of the internal contract inside that i need two variables destEid and peerAddress in bytes32
  await sourceOApp.setPeer(destEid, bytes32(uint256(uint160(peerAddress))));

  console.log('Peer set successfully');

};