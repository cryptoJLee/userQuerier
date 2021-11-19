const Web3 = require('web3');

var web3 = new Web3('https://ropsten.infura.io/v3/baf2068c495b4fd3be25b5368d57e009');
// console.log(web3);
var abi = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "state",
				"type": "bool"
			}
		],
		"name": "setUserState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userState",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var address = "0x1219262A5A391f6c4B24634c36F56A6B2e453348";
var contract = new web3.eth.Contract(abi, address);
console.log(contract.options);


const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/user/:address', async (req, res) => {
  var requestedAddress = req.params.address;
  console.log(requestedAddress);
  
  try {
    var state = contract.methods.userState(requestedAddress).call();
    res.end((await state).toString());  
  } catch (e) {
    res.end("false");
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})