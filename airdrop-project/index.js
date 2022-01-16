const  {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account
} = require( "@solana/web3.js");

// creating a new user wallet
const keyPair = new Keypair();
// console.log("**@ new keypair 0 is , ",keyPair);

// printing out public key 
const publicKey = new PublicKey(keyPair._keypair.publicKey).toString();
// console.log("**@ public key 0 is , ",publicKey);

// printing out private key 
const privateKey = keyPair._keypair.secretKey;
// console.log("**@ private key 0 is , ",privateKey);

console.log("*********************************************************************");
console.log("*********************************************************************");
console.log("*********************************************************************");
console.log("*********************************************************************");


// a function to get wallet balance using private key
const getWalletBalanceFromPrivateKey = async (privateKey)=>{
  try{
    // connecting to solana network 
    const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
    // console.log("**@ connection is , ",connection);

    // creating a wallet object from the secret key 
    const userWallet = await Keypair.fromSecretKey(privateKey);
    // console.log("**@ user wallet 1  is , ",userWallet);

    // getting public key from user wallet 
    const publicKey = new PublicKey(userWallet.publicKey);
    // console.log("**@ publicKey 1  is , ",publicKey);

    // getting wallet balance 
    const walletBalance = await connection.getBalance(publicKey);
    console.log("**@ wallet balance 1 is , ",walletBalance);

    console.log(`   Wallet balance 1: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);





  }
  catch(err){
    console.log("**@ error while getting wallet balance from private key , error is , ",err);
  }
}


// a function to get wallet balance using public key 
const getWalletBalanceFromPublicKey = async (publicKey)=>{
  try{
    // connecting to solana network 
    const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
    // console.log("**@ connection is , ",connection);

    // console.log("**@ public key 2 is , ",publicKey);

    const walletBalance = await connection.getBalance(publicKey);
    console.log("**@ walletBalance 2 is , ",walletBalance);
    console.log(`   Wallet balance 2: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);



  }
  catch(err){
    console.log("**@ error while getting wallet balance from public key , error is , ",err);
  }
} 

// a function to airdrop sol using private key 
const airdropSolUsingPrivateKey= async (privateKey)=>{
  try {
    // connecting to the solana network 
    const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
    

    // generating user wallet from private key 
    const userWallet = await Keypair.fromSecretKey(privateKey);

    // generating and signing the tx 
    const airdropSignature = await connection.requestAirdrop(
      new PublicKey(userWallet.publicKey),
      2*LAMPORTS_PER_SOL
    );

    // sending and confirming the tx 
    await connection.confirmTransaction(airdropSignature)

  }
  catch(err){
    console.log("**@ something went wrong while airdropping sol using private key , error is , ",err);
  }
}

// a function to airdrop sol using public key 
const airdropSolUsingPublicKey= async (publicKey)=>{
  try {
    // connecting to the solana network 
    const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
    



    // generating and signing the tx 
    const airdropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      2*LAMPORTS_PER_SOL
    );

    // sending and confirming the tx 
    await connection.confirmTransaction(airdropSignature)

  }
  catch(err){
    console.log("**@ something went wrong while airdropping sol using private key , error is , ",err);
  }
}


// airdrop using public keys 
const driveFunctionPublic = async ()=>{
 await  getWalletBalanceFromPublicKey(keyPair.publicKey);
 await  airdropSolUsingPublicKey(keyPair.publicKey)
 await  getWalletBalanceFromPublicKey(keyPair.publicKey);

}


// airdrop using private keys 
const driveFunctionPrivate = async ()=>{
 await getWalletBalanceFromPrivateKey(privateKey);
 await  airdropSolUsingPrivateKey(privateKey);
 await  getWalletBalanceFromPrivateKey(privateKey);
}

// driveFunctionPrivate();
driveFunctionPublic();
