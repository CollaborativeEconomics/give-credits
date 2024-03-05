import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { setCookie } from 'cookies-next'
//import Link from 'next/link'
import Page from 'components/page'
import BackButton from 'components/backbutton'
import Button from 'components/button'
import Card from 'components/card'
import Divider from 'components/divider'
import Checkbox from 'components/form/checkbox'
import TextInput from 'components/form/textinput'
//import Spinner from 'components/spinner'
import TextRow from 'components/textrow'
import { getOrganizationById, getInitiativeById } from 'utils/registry'
import getRates from 'utils/rates'
//import PaymentXDR from 'utils/payment'
//import trustlineXDR from 'utils/trustlineXDR'
//import checkTrustline from 'utils/checkTrustline'
import Wallet from 'utils/wallet'
import {postApi} from 'utils/api'
import {Contract, networks} from 'contracts/credits/client'
import {$$} from 'utils/common'

const wallet = new Wallet()

export async function getServerSideProps(props:any){
  const query = props.query
  const organizationId = props.params?.organizationId || ''
  try {
    //console.log('QUERY:', query)
    //const usdRate = await getRates('XLM')
    const usdRate = 0.10 // TODO: REMOVE WHEN READY
    const organization = await getOrganizationById(organizationId)
    const initiative = await getInitiativeById(query.initiativeId)
    const props = {
      organization,
      initiative,
      amount: query?.amount ?? 0,
      credit: query?.credit ?? 0,
      currencyName: query.tokenName ?? 'XLM',
      currency: query.tokenCode ?? 'XLM',
      issuer: query.tokenIssuer ?? '',
      usdRate,
      destinationTag: query.destinationTag ?? null
    }
    //console.log('PROPS', props)
    return { props }
  } catch(ex:any) {
    console.error(ex)
    return {
      props: {
        err: 'Something went wrong 😕'
      }
    }
  }
}

interface Summary {
  organization:any
  initiative:any
  amount:number
  credit:number
  currencyName:string
  currency:string
  issuer:string
  usdRate:number
  destinationTag:number
}

export default function Handler(props:any){
  const {
    organization,
    initiative,
    amount,
    credit,
    currencyName,
    currency,
    issuer,
    usdRate,
    destinationTag
  }:Summary = props

  const initiativeId = initiative.id
  const contractId = initiative.contractcredit
  const tonCredit = credit / usdRate
  const offsetVal = tonCredit>0 ? (amount / tonCredit) : 0
  //console.log('OFFSET:', offsetVal)

  const { ...router } = useRouter()
  const [confirmed, setConfirmed] = useState(false)

  const { register, watch } = useForm({
    defaultValues: { yesReceipt: false, yesNFT:true, name: '', email: '' }
  })
  const [yesReceipt, yesNFT, name, email] = watch(['yesReceipt', 'yesNFT', 'name', 'email'])

  const onPressConfirm = useCallback(() => {
    console.log('Confirmed...')
    setConfirmed(true);
  }, [setConfirmed]);

  // Send payment confirmation to wallet
  useEffect(() => {
    if (confirmed) {
      setConfirmed(false)
      sendPayment(contractId, name, email, organization, initiativeId, amount, currency, usdRate, issuer, destinationTag, yesReceipt, yesNFT)
    }
  }, [confirmed, contractId, name, email, organization, initiativeId, amount, currency, usdRate, issuer, destinationTag, yesReceipt, yesNFT])

  function getWalletByChain(wallets:[any], chain:string){
    for(let i=0; i<wallets.length; i++){
      if(wallets[i].chain==chain){
        return wallets[i]
      }
    }
    return null
  }

  // Contract call
  async function donate(contractId:string, from:string, amount:number) {
    try {
      console.log('-- Donating', contractId, from, amount)
      const nettype = process.env.NEXT_PUBLIC_STELLAR_NETWORK||''
      const network = nettype=='futurenet' ? networks.futurenet : networks.testnet
      const opt = {contractId, ...network}
      console.log('NET', opt)
      const wei = BigInt(amount*10000000) // 7 decs
      const dat = {from, amount:wei}
      const ctr = new Contract(opt)
      const trx = await ctr.donate(dat)
      //const trx = await ctr.donate([from, wei])
      const res = await trx.signAndSend()
      console.log('JSN', JSON.stringify(res,null,2))
      console.log('RES1', res)
      console.log('RES2', res.sendTransactionResponse)
      console.log('RES3', res.getTransactionResponse)
      console.log('RES4', res.getTransactionResponse?.status)
      let txid = ''
      if(res?.getTransactionResponse?.status == 'SUCCESS'){
        txid = res?.sendTransactionResponse?.hash || ''
        return {success:true, txid, error:null}
      } else {
        return {success:false, txid:'', error:'Error sending payment'} // get error?
      }
    } catch(ex:any) {
      console.error('ERROR', ex)
      return {success:false, error:ex?.message || 'Error sending payment', txid:''}
    }
  }

  // Wallet call
  async function sendPayment(contractId:string, name:string, email:string, organization:any, initiativeId:string, amount:number, currency:string, rate:number, issuer:string, destinTag:number, yesReceipt:boolean, yesNFT:boolean){
    console.log('PAY', {contractId, name, email, organization, initiativeId, amount, currency, rate, issuer, destinTag, yesReceipt, yesNFT})
    const orgwallet = getWalletByChain(organization.wallets, 'Stellar')
    if(!orgwallet){
      $$('message', 'Error: no Stellar wallet for this organization')
      console.log('Error sending payment, no Stellar wallet')
      return
    }
    $$('message', 'Confirm payment in your wallet')
    const destin = orgwallet.address
    console.log('Sending payment to', destin)
    await wallet.init()
    const info = await wallet.connect()
    const donor = info?.account
    console.log('DONOR', donor)
    if(!donor){
      $$('message', 'Error: Signature rejected by user')
      console.log('Error: Signature rejected by user')
      return
    }
    setCookie('wallet', donor)
    // Check network
    const useNetwork = process.env.NEXT_PUBLIC_STELLAR_NETWORK||''
    if(info.network!==useNetwork){
      console.log('Error: Wrong network', info.network)
      console.log('Expected network:', useNetwork)
      $$('message', 'Select '+useNetwork+' network in Freighter Wallet')
      return
    }
    //const memo = destinTag ? 'tag:'+destinTag : ''
    // TODO: get contract id for initiativeId
    //const contractId = 'CD56WYW2DWT2N2PWZ2LYFEVKORDQFQBYB6CNYHFWN5HC66HELNMCXNVJ';
    const result = await donate(contractId, donor, amount)
    console.log('UI RESULT', result)
    if(!result?.success){
     $$('message', 'Error sending payment')
     return
    }
    $$('message', 'Payment sent successfully')
    if(yesReceipt){
     sendReceipt(name, email, organization, amount, currency, rate, issuer)
    }
    if(yesNFT){
      const minted = await mintNFT(result.txid, initiativeId, donor, destin, amount, rate)
      if(minted?.success){
        router.push(`/donation_confirmation?ok=true&chain=Stellar&txid=${result.txid}&nft=true&nftid=${encodeURIComponent(minted.tokenId)}&urinft=${encodeURIComponent(minted.image)}&urimeta=${encodeURIComponent(minted.metadata)}`)
      }
    } else {
      router.push(`/donation_confirmation?ok=true&chain=Stellar&txid=${result.txid}`)
    }
  }

/*
  async function sendPaymentOLD(name, email, organization, initiativeId, amount, currency, issuer, destinTag, yesReceipt, yesNFT){
    const orgwallet = getWalletByChain(organization.wallets, 'Stellar')
    if(!orgwallet){
      $$('message', 'Error: no Stellar wallet for this organization')
      console.log('Error sending payment, no Stellar wallet')
      return
    }
    $$('message', 'Waiting for confirmation')
    const destin = orgwallet.address
    console.log('Sending payment to', destin)
    await wallet.init()
    const info = await wallet.connect()
    const source = info?.account
    console.log('SOURCE', source)
    if(!source){
      $$('message', 'Error: Signature rejected by user')
      console.log('Error: Signature rejected by user')
      return
    }
    setCookie('wallet', source)
    const memo = destinTag ? 'tag:'+destinTag : ''
    //const {txid, xdr} = await PaymentXDR(source, destin, amount, currency, issuer, memo)
    //console.log('txid', txid, xdr)
    //wallet.signAndSubmit(xdr, async result=>{
    const result = await wallet.payment(destin, amount, memo)
    console.log('UI RESULT', result)
    if(!result?.success || result?.error){
     console.log('Error', result.error)
     $$('message', 'Error sending payment')
     return
    }
    console.log('Result', result)
    if(result.error){
      $$('message', 'Error sending payment')
      return
    }
    $$('message', 'Payment sent successfully')
    if(yesReceipt){
     sendReceipt(name, email, organization, amount, currency, issuer)
    }
    if(yesNFT){
      //verifyTrustline(source, txid)
      const minted = await mintNFT(result.txid, initiativeId, source, destin)
      if(minted?.success){
        router.push(`/donation_confirmation?ok=true&chain=Stellar&txid=${result.txid}&nft=true&nftid=${encodeURIComponent(minted.tokenId)}&urinft=${encodeURIComponent(minted.image)}&urimeta=${encodeURIComponent(minted.metadata)}`)
      }
    } else {
      router.push(`/donation_confirmation?ok=true&chain=Stellar&txid=${result.txid}`)
    }
  }
*/
  async function sendReceipt(name:string, email:string, organization:any, amount:number, currency:string, rate:number, issuer:string){
    fetch('/api/receipt', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf8'
      },
      body: JSON.stringify({
        name,
        email,
        amount,
        currency,
        rate, 
        issuer,
        orgName:organization.name,
        orgAddress:organization.address,
        orgEin:organization.ein
      })
    }).then(async (response) => {
      console.log('Receipt sent')
      const result = await response.json()
      console.log('Result', result)
    }).catch(console.warn)
  }

  async function mintNFT(txid:string, initid:string, donor:string, destin:string, amount:number, rate:number){
    // Mint NFT
    //const imageuri = 'ipfs:QmdmPTsnJr2AwokcR1QC11s1T3NRUh9PK8jste1ngnuDzT'
    //const metadata = 'ipfs:Qme4c3dERwN7xNrC7wyDgbxF4bQ5aS9uNwaeXdXbWTeabh'
    //const imageurl = 'https://gateway.lighthouse.storage/ipfs/QmdmPTsnJr2AwokcR1QC11s1T3NRUh9PK8jste1ngnuDzT'
    //const metaurl  = 'https://gateway.lighthouse.storage/ipfs/Qme4c3dERwN7xNrC7wyDgbxF4bQ5aS9uNwaeXdXbWTeabh'
    $$('message', 'Minting NFT, wait...')
    const minted = await postApi('nft/mint', {txid, initid, donor, destin, amount, rate})
    console.log('Minted', minted)
    if(!minted?.success){
      $$('message', 'Error minting NFT')
      return minted
    }
    $$('message', `NFT minted successfully • <a href="${minted.image}" target="_blank">Image</a> • <a href="${minted.metadata}" target="_blank">Meta</a>`)
    return minted
  }

  return (
    <Page>
      <BackButton />
      <div className="mb-6">
        <h5 className="uppercase text-gray-400 mb-4">Summary</h5>
        <Card>
          <div className="w-full flex flex-col items-stretch">
            <TextRow
              label="Recipient"
              text={organization.name}
              className="px-6 pb-3 pt-6"
            />
            <TextRow
              label="Initiative"
              text={initiative.title}
              className="px-6 pb-3 pt-6"
            />
            <TextRow
              label="Donation Amount"
              text={`${amount} ${currencyName}`}
              className="px-6 py-3"
            />
            <TextRow
              label="Total Value (nearest cent)"
              text={`$${(amount * usdRate).toFixed(2)} USD`}
              className="px-6 py-3"
            />
          {/* TODO: IF CARBON OFFSET SHOW THIS */}
            <TextRow
              label="Estimated carbon offset"
              text={`$${offsetVal.toFixed(2)} TONS`}
              className="px-6 py-3"
            />
            <Divider />
            <TextInput
              label="Donor Name"
              placeholder="Optional"
              className="p-6"
              register={register('name')}
            />
            <Checkbox className="pl-4 pb-6"
              label="I would like an NFT"
              check={true}
              register={register('yesNFT')}
            />
            <Checkbox className="pl-4 pb-6"
              label="I would like a receipt"
              register={register('yesReceipt')}
            />
            <TextInput
              label="Enter your email"
              register={register('email')}
              className={`px-6 pb-6 ${!yesReceipt ? 'hidden' : ''}`}
            />
          </div>
        </Card>
        <Button
          text="Confirm"
          className="w-full bg-blue-700"
          onClick={onPressConfirm}
        />
        <p id="message" className="mt-5 text-center">One wallet confirmation required</p>
      </div>
    </Page>
  )
}
