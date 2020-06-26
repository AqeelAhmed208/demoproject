

console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/a840d3632fd344318081753992fa90ba";

let web3 = new Web3(rpcURL);

let address = "0x6EEC5239327E5965B00bFce8341eDa78Dc957c82";

web3.eth.getBalance(address, function (err, wei) {
    console.log("WEI ", wei);
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Balance ", balance); 
});