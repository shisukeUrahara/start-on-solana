import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} from "@solana/web3.js";

// creating a new key pair
const newPair = new Keypair();
// console.log("**@ newPair is , ", newPair);

// getting the public key from the wallet instance
const publicKey = new PublicKey(newPair.publicKey).toString();
// console.log("**@ publicKey is , ", publicKey);

// getting the secret key from the wallet instance
const secretKey = newPair.secretKey;
// console.log("**@ secretKey is , ", secretKey.toString());

// a function to get wallet balance
const getWalletBalance = async () => {
  try {
    // connecting to the network
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // console.log("**@ connection   is , ", connection);

    // creating a new wallet
    const myWallet = await Keypair.fromSecretKey(secretKey);
    // console.log("**@ myWallet   is , ", myWallet);

    // getting the wallet balance
    const balance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(
      "**@ wallet balance  is , ",
      parseInt(balance) / LAMPORTS_PER_SOL,
      "SOL"
    );

    return balance;
  } catch (err) {
    console.log("**@ getWalletBalance failed , error is , ", err);
  }
};

const airDropSol = async () => {
  try {
    // connecting to network
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);

    console.log("**@ AIRDROPPING SOLS ");

    // creating an airdrop signature
    const fromAirdropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      5 * LAMPORTS_PER_SOL
    );

    // waiting for confirming the transaction

    // console.log("**@ WAITING FOR CONFIRMATION  ");

    await connection
      .confirmTransaction(fromAirdropSignature)
      .then((result) => {
        console.log("**@ airdrop completed");
      })
      .catch((err) => {
        console.log("**@ confirmTransaction failed , error is , ", err);
      });

    // console.log("**@ airdrop completed");
  } catch (err) {
    console.log("**@ airDropSol failed , error is , ", err);
  }
};

// making a driver function to call the airdrop method
const driverFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

driverFunction();
