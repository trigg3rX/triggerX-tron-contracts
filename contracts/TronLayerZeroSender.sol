// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./interfaces/ILayerZeroEndpoint.sol";

contract TronLayerZeroSender is Initializable, OwnableUpgradeable, PausableUpgradeable {
    ILayerZeroEndpoint public lzEndpoint;
    uint32 public destEid;
    bytes public options;

    event MessageSent(string message, uint32 dstEid);

    function initialize(address _lzEndpoint, uint32 _destEid) public initializer {
        __Ownable_init();
        __Pausable_init();
        lzEndpoint = ILayerZeroEndpoint(_lzEndpoint);
        destEid = _destEid;
        // Set default options, can be updated later
        options = abi.encodePacked(uint16(1), uint256(10000000000)); // version 1, gas amount 200000
    }

    function sendMessage(string memory _message) external payable whenNotPaused {
        bytes memory encodedMessage = abi.encode(_message);
        
        ILayerZeroEndpoint.MessagingFee memory fee = ILayerZeroEndpoint.MessagingFee({
            nativeFee: msg.value,
            lzTokenFee: 0
        });

        lzEndpoint.send{value: msg.value}(
            destEid,
            encodedMessage,
            options,
            fee,
            payable(msg.sender)
        );

        emit MessageSent(_message, destEid);
    }

    function setDestination(uint32 _destEid) external onlyOwner {
        destEid = _destEid;
    }

    function setOptions(bytes memory _options) external onlyOwner {
        options = _options;
    }

    function setLzEndpoint(address _lzEndpoint) external onlyOwner {
        lzEndpoint = ILayerZeroEndpoint(_lzEndpoint);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}