

console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/a840d3632fd344318081753992fa90ba";

let web3 = new Web3(rpcURL);
let address = "0xCa52ca3938E84C97ec3Ff6341738c2DFF7987ACd"
let abi = [
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
	}
];

const contract = new web3.eth.Contract(abi, address);

//console.log("Contract ", contract );
//console.log("get.age", contract.methods.getAge);
//console.log("doSomeWork", contract.methods.doSomeWork);

//contract.methods.getAge().call(function (err,result){
//    console.log("Age =",result);
    
//});//

contract.methods.doSomeWork().call(function (err,result){
    console.log("Work =",result);
    
});