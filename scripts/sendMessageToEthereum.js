const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',  // Tenet testnet
    privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595'
});

async function sendMessageToEthereum() {
    const contractAddress = 'TNZL6t9PgMNsEoXWfXiyGbA7nHoEd1xzL7';
    const contract = await tronWeb.contract().at(contractAddress);
    
    const message = "Hello from Tron!";
    const feeInSun = 1000000100; // Adjust based on current gas prices

    try {
        const transaction = await contract.sendMessage(40217,message).send({
            feeLimit: feeInSun,
            callValue: 0, // Set this to the amount of TRX you want to send with the transaction
            shouldPollResponse: true
        });

        console.log("Transaction sent successfully!");
        console.log("Transaction ID:", transaction);

    } catch (error) {
        console.error("Error sending message:", error);
    }
}

sendMessageToEthereum();


