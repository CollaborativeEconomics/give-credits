import { Address, BASE_FEE, Contract, Keypair, SorobanRpc, TransactionBuilder } from "@stellar/stellar-sdk"

export default async function submit(network:any, secret:string, contractId:string, method:string, args:any) {
  const source   = Keypair.fromSecret(secret)
  const server   = new SorobanRpc.Server(network.rpcUrl)
  const contract = new Contract(contractId)
  const account  = await server.getAccount(source.publicKey())

  let op = contract.call(method, ...args)
  let tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase: network.networkPassphrase })
    .addOperation(op)
    .setTimeout(30)
    .build()

  let prep = await server.prepareTransaction(tx);
  prep.sign(source)
  //console.log(`Signed prepared transaction XDR: ${prep.toEnvelope().toXDR("base64")}`);

  try {
    let response = await server.sendTransaction(prep);
    console.log(`Sent transaction: ${JSON.stringify(response)}`);
    let txid = response.hash

    if (response.status === "PENDING") {
      let result = await server.getTransaction(response.hash);
      // Poll `getTransaction` until the status is not "NOT_FOUND"
      while (result?.status === "NOT_FOUND") {
        //console.log("Waiting for transaction confirmation...");
        // See if the transaction is complete
        result = await server.getTransaction(response.hash);
        // Wait one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      //console.log(`getTransaction response: ${JSON.stringify(result)}`);

      console.log(`Status:`, result.status);
      if (result?.status === "SUCCESS") {
        // Make sure the transaction's resultMetaXDR is not empty
        if (!result.resultMetaXdr) {
          //throw "Empty resultMetaXDR in getTransaction response";
          return {success:false, value:null, error:'Error making payment'}
        }
        // Find the return value from the contract and return it
        let metaXDR = result.resultMetaXdr;
        let returnValue = result.returnValue;
        let value = returnValue?.value() || null;
        console.log('Return value:', value);
        return {success:true, value, error:null}
      } else {
        return {success:false, value:null, error:null}
        //throw `Transaction failed: ${result.resultXdr}`;
      }
    } else {
      //throw response.errorResultXdr;
      return {success:false, value:null, error:'Error making payment'}
    }
  } catch (err:any) {
    console.log('Error', err);
    return {success:false, value:null, error:err.message||'Error making payment'}
  }
}
