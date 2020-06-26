

console.log(Web3);

const rpcURL = "http://127.0.0.1:7545";

let web3 = new Web3(rpcURL);

let address = "0xC1f38B8782B0AEe4e3f1BfEAD8C3eF1640D6c538";

web3.eth.getBalance(address, function (err, wei) {
    console.log("WEI ", wei);
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Balance ", balance); 
});
