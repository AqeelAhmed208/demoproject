var Tx = require ('ethereumjs-tx');
const Web3 = require ('web3')
const web3 = new Web3 ('https://ropsten.infura.io/v3/a840d3632fd344318081753992fa90ba');

const account1 = "0x6EEC5239327E5965B00bFce8341eDa78Dc957c82"

const privateKey1 = "AF421722AEA8F434260A8B55E483A3B8044026F5A0FF2CD2AC63ABD188D5BEFA"

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');

const contractAddress = "0xb0BD9E1D5A22519b86A4Bb727938862a9A278443";

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "doSomeWork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, contractAddress);

console.log("Buffer 1 = ", privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
   
  const txObject = {
  	nonce:    web3.utils.toHex(txCount),
  	gasLimit: web3.utils.toHex(800000),
  	gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  	to: contractAddress,
  	data: contract.methods.setAge(100).encodeABI()
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
      });

});

contract.methods.getAge().call(function (err,result){
    console.log("Age =", result);
    });
