//引入bitcoin模組
const bitcoin = require("bitcoinjs-lib");


//選用regtest網路
const regtest = bitcoin.networks.testnet

//https://github.com/bitcoinjs/bip65 
const bip65 = require('bip65')

//輸入私鑰，教學用，請勿隨意公開私鑰
var privateKey = "cNcvQphXWjAJ365Y8Tuhti5a6fCh9ftpR3GScZs5vdidBwQqpxT4";

//產生公鑰跟私鑰
const keyPair = bitcoin.ECPair.fromWIF(privateKey,regtest);

//產生付款位址
const { 2N2DjjQuurpBF111aNM7a8vP5vAR7QuoZKe } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
console.log(bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }));
const txb = new bitcoin.TransactionBuilder(regtest);


//用listunspent 取出最後一筆資料的txid
txb.addInput('393c654889e3d9d1cbec2c080a81745f903ed907214498fbfd74930d29b446f9', 0);

//用getnewaddress取得新的位址
txb.addOutput('2MxfNS8sB1GcCo3GBLmX2PUw277H9zvrn2L', 12)

//交易簽名
txb.sign(0, keyPair); //第一個位置的是上一筆交易中的第一個支出，第二個欄位是我們的公鑰與私鑰

//取得交易序號
const transaction_01 = txb.build().toHex(); 
console.log(transaction_01);
