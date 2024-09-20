// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface ILayerZeroEndpoint {
    struct MessagingFee {
        uint256 nativeFee;
        uint256 lzTokenFee;
    }

    function send(
        uint32 _dstEid,
        bytes memory _message,
        bytes memory _options,
        MessagingFee memory _fee,
        address payable _refundAddress
    ) external payable;

    
    function estimateFees(uint16 _dstChainId, address _userApplication, bytes memory _payload, bool _payInZRO, bytes memory _adapterParams) external view returns (uint256 nativeFee, uint256 zroFee);
}