const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',  // Tenet testnet
    privateKey: 'ee83840452506217fea5c7c812d6b8e5c63e437518aa27a085342c68a9ac6595'
});

async function sendMessageToEthereum() {
    const contractAddress = 'TTDDUUpv1v1o5jAMc8ztshxMGxTS3AtoUk';
    const contract = await tronWeb.contract().at(contractAddress);
    
    const message = "Hello from Tron!";
    const feeInSun = 5000000000; // Adjust based on current gas prices
    const destEid = '40217';//40161, 40217

    try {

        const est_fee = await contract.quote(destEid,message,false);
        console.log("Your Estimated fee:", est_fee);

        const transaction = await contract.send(destEid,message).send({
            feeLimit: feeInSun,
            callValue: 500, // Set this to the amount of TRX you want to send with the transaction
            shouldPollResponse: true
        });

        console.log("Transaction sent successfully!");
        console.log("Transaction ID:", transaction);

    } catch (error) {
        console.error("Error sending message:", error);
    }
}

sendMessageToEthereum();


