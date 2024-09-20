const port = process.env.HOST_PORT || 9090

module.exports = {
  networks: {
    mainnet: {
      // Don't put your private key here:
      privateKey: process.env.PRIVATE_KEY_MAINNET,
      /*
Create a .env file (it must be gitignored) containing something like

  export PRIVATE_KEY_MAINNET=4E7FEC...656243

Then, run the migration with:

  source .env && tronbox migrate --network mainnet

      */
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595',
      // privateKey: process.env.PRIVATE_KEY_SHASTA,
      userFeePercentage: 50,
      feeLimit: 1000 * 1e8,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '1000'
    },
    nile: {
      privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595',
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://nile.trongrid.io',
      network_id: '3'
    },
    development: {
      // For tronbox/tre docker image
      privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595',
      userFeePercentage: 0,
      feeLimit: 1000 * 1e6,
      fullHost: 'http://127.0.0.1:' + port,
      network_id: '9'
    },
    compilers: {
      solc: {
        version: '0.8.6'
      }
    }
  },
  // solc compiler optimize
  solc: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 200
  //   },
  //   evmVersion: 'istanbul'
  }
}
// module.exports = {
//   networks: {
//     shasta: {
//       privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595',
//       userFeePercentage: 100,
//       feeLimit: 100000000,
//       fullHost: "https://api.shasta.trongrid.io",
//       network_id: "*"
//     },
//   },
//   compilers: {
//     solc: {
//       version: "0.8.0"
//     }
//   }
// };
