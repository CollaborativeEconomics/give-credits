import { Address, BASE_FEE, Contract, Keypair, SorobanRpc, TransactionBuilder, xdr } from "@stellar/stellar-sdk"

export async function submit(network:any, secret:string, contractId:string, method:string, args:any) {
  const source   = Keypair.fromSecret(secret)
  const server   = new SorobanRpc.Server(network.rpcUrl)
  const contract = new Contract(contractId)
  const account  = await server.getAccount(source.publicKey())
  console.log({network, contractId, method, args})

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
      while (result.status === "NOT_FOUND") {
        //console.log("Waiting for transaction confirmation...");
        // See if the transaction is complete
        result = await server.getTransaction(response.hash);
        // Wait one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      //console.log(`getTransaction response: ${JSON.stringify(result)}`);

      console.log(`Status:`, result.status);
      if (result.status === "SUCCESS") {
        // Make sure the transaction's resultMetaXDR is not empty
        if (!result.resultMetaXdr) {
          throw "Empty resultMetaXDR in getTransaction response";
        }
        // Find the return value from the contract and return it
        let metaXDR = result.resultMetaXdr;
        //console.log('Trans Meta:', metaXDR);
        //console.log('Trans Meta:', JSON.stringify(metaXDR,null,2));
        let returnValue = result.returnValue;
        //console.log('Return value:', returnValue);

        //let resultMetaXdr = metaXDR.toXDR();
        //let resultMetaXdrString = resultMetaXdr.toString("base64");
        //let meta = new xdr.TransactionMeta.fromXDR(resultMetaXdrString, "base64")
        //let sorobanMeta = meta.v3().sorobanMeta();
        //console.log('META', sorobanMeta)

        // TOKENID
        //const meta:any = new SorobanRpc.xdr.TransactionResultMeta(metaXDR)
        // @ts-ignore: I hate this
        const meta:any = new xdr.TransactionResultMeta(metaXDR)
        //const meta:any = new xdr.TransactionMeta(metaXDR)
        //console.log('Meta:', meta);
        //console.log('Meta:', JSON.stringify(meta,null,2));
        const lastId = meta?._attributes?._value?._attributes?.sorobanMeta?._attributes?.events[0]?._attributes?.body?._value?._attributes?.data?._value?._attributes?.lo?._value?.toString() || ''
        //const lastId = '1'
        const tokenId = contractId + ' #' + lastId
        console.log('TOKENID', tokenId)
        return {success:true, tokenId, error:null}
      } else {
        return {success:false, tokenId:'', error:result}
        //throw `Transaction failed: ${result.resultXdr}`;
      }
    } else {
      //throw response.errorResultXdr;
      console.log('Error:', response)
      return {success:false, tokenId:'', error:'Error minting NFT'}
    }
  } catch (err:any) {
    // Catch and report any errors we've thrown
    console.log("Error sending transaction", err);
    return {success:false, tokenId:'', error:err.message||'Error minting NFT'}
  }
}
