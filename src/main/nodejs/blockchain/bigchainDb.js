const driver = require('bigchaindb-driver');


const alice = new driver.Ed25519Keypair();
const conn = new driver.Connection(
    'https://test.bigchaindb.com/api/v1/',
    { app_id: 'e425b5f8',
      app_key: '2e9821f00c4a814e1f9d63b1338753f9' });
const tx = driver.Transaction.makeCreateTransaction(
    { message: 'Hello World' },
    null,
    [ driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey))],
    alice.publicKey);
const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey);
conn.postTransaction(txSigned);