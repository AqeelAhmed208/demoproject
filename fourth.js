var Tx = require ('ethereumjs-tx');
const Web3 = require ('web3')
const web3 = new Web3 ('http://127.0.0.1:7545');

const account1 = "0xC1f38B8782B0AEe4e3f1BfEAD8C3eF1640D6c538"

const account2 = "0xD8F0734F8bC5506E41325ecC46158da9171A75E8"

const privateKey1 = "f2a51d0f797e8988f53528fa50513de75895097521c9c2dbde7071da10f1b021"
const privateKey2 = "01e13726aeef0382f4de2e1c7cb87c229adb1e24cfa99faa2c0002ee0d1ea763"

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ", privateKey1Buffer);
console.log("Buffer 2 = ", privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       account2,
      value:    web3.utils.toHex(web3.utils.toWei('3', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    const tx = new Tx.Transaction(txObject);
    tx.sign(privateKey1Buffer);
    
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    //console.log("tx = ", tx);
    //console.log("serializedTx = ", serializedTx);
    //console.log("raw = ", raw);
    
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
      })

});