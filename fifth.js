var Tx = require ('ethereumjs-tx');
const Web3 = require ('web3')
const web3 = new Web3 ('https://ropsten.infura.io/v3/a840d3632fd344318081753992fa90ba');

const account1 = "0x6EEC5239327E5965B00bFce8341eDa78Dc957c82"

const account2 = "0xDd75A134Cf08b00f1Ace80B244bFa653e929435a"

const privateKey1 = "AF421722AEA8F434260A8B55E483A3B8044026F5A0FF2CD2AC63ABD188D5BEFA"
const privateKey2 = "AF7C067B80E88CC0D10BF3A9D1400E9F1C0D943D11FF521E173094EAC260FCBE"

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ", privateKey1Buffer);
console.log("Buffer 2 = ", privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       account2,
      value:    web3.utils.toHex(web3.utils.toWei('0.05463', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    const tx = new Tx.Transaction(txObject, { chain: 'ropsten', hardfork: 'petersburg' });
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