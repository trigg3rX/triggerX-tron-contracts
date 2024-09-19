const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',  // Tenet testnet
    privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595'
});

async function sendMessageToEthereum() {
    const contractAddress = 'your_tron_contract_address';
    const contract = await tronWeb.contract().at(contractAddress);

    const message = "Hello from Tron!";
    const feeInSun = 1000000; // Adjust based on current gas prices

    try {
        const result = await contract.sendMessage(message).send({
            callValue: feeInSun
        });
        console.log('Message sent. Transaction:', result);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

sendMessageToEthereum();