import { Address, nativeToScVal }  from "@stellar/stellar-sdk"
import { Contract, networks } from '@/contracts/credits/client'
import { submit } from '@/contracts/credits/server'

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  try {
    const requrl = new URL(request.url)
    const contract = (requrl.searchParams.get('contract') || '')
    if(!contract){ return Response.json({success:false, error:'Contract id to restore not provided'}, {status:400}) }
    console.log('Restore Credits Contract', contract)
    const network = networks[process.env.NEXT_PUBLIC_STELLAR_NETWORK]
    const from    = new Address(process.env.CFCE_MINTER_WALLET_ADDRESS).toScVal()
    const secret  = process.env.CFCE_MINTER_WALLET_SECRET
    const method  = 'donate'
    const amount  = nativeToScVal('100', { type: 'i128' }) // 100 stroops to allow percent fees
    const args    = [from, amount]
    const result  = await submit(network, secret, contract, method, args)
    console.log('RESTORED', result)
    return Response.json(result)
  } catch(ex:any) {
    console.error(ex)
    return Response.json({success:false, error:ex.message}, {status:500})
  }
}
