// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./interfaces/ILayerZeroEndpoint.sol";
import "./interfaces/ILayerZeroReceiver.sol";


contract TronLayerZeroSender is Initializable, OwnableUpgradeable, PausableUpgradeable, ILayerZeroReceiver {
    ILayerZeroEndpoint public lzEndpoint;
    uint16 public destChainId;
    bytes public destAddr;

    function initialize(address _lzEndpoint, uint16 _destChainId, bytes memory _destAddr) public initializer {
        __Ownable_init();
        __Pausable_init();
        lzEndpoint = ILayerZeroEndpoint(_lzEndpoint);
        destChainId = _destChainId;
        destAddr = _destAddr;
    }

    function sendMessage(string calldata _message) external payable {
        bytes memory payload = abi.encode(_message);
        lzEndpoint.send{value: msg.value}(destChainId, destAddr, payload, payable(msg.sender), address(0x0), bytes(""));
    }

    function lzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) external override {
        require(msg.sender == address(lzEndpoint), "Invalid endpoint caller  ");
        // Handle received message if needed
    }

    function setDestination(uint16 _destChainId, bytes memory _destAddr) external onlyOwner {
        destChainId = _destChainId;

        destAddr = _destAddr;
    }

    // Function to be able to update the LayerZero endpoint if needed
    function setLzEndpoint(address _lzEndpoint) external onlyOwner {
        lzEndpoint = ILayerZeroEndpoint(_lzEndpoint);
    }
}
