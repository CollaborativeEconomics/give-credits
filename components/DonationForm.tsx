'use client'
import { useRef, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { InputWithContent } from './ui/input-with-content'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { CheckboxWithText } from './ui/checkbox'
import { DonationContext } from '@/components/DonationView'
import { DonationFormSelect } from '@/components/DonationFormSelect'
import { Separator } from './ui/separator'
import { Dictionary, getChainWallets, getChainsList, getChainsMap } from '@/libs/chains/utils'
import Chart from '@/components/carbonchart'
import Progressbar from '@/components/progressbar'
import Wallet from '@/libs/wallets/freighter'
import {Contract, networks} from '@/contracts/credits/client'
import { fetchApi, postApi } from '@/utils/api'


export default function DonationForm(props:any) {
  //console.log('Props', props)
  const initiative = props.initiative
  const contractId = initiative.contractcredit
  const organization = initiative.organization
  const {donation, setDonation} = useContext(DonationContext)
  const usdRate = props.rate || 0
  const credit = initiative?.credits?.length>0 ? initiative?.credits[0] : null
  const creditGoal = credit?.goal ?? 0
  const creditCurrent = credit?.current ?? 0
  const creditValue = credit?.value ?? 0
  const creditPercent = (creditValue * 100 / creditGoal).toFixed(0)
  const creditDate = new Date().toLocaleDateString(undefined, {month:'long', day:'numeric', year:'numeric'})
  const wallet = new Wallet()

  function $(id:string){ return document.getElementById(id) as HTMLInputElement }

  function validEmail(text:string){
    return text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  }

  function getWalletByChain(wallets:[any], chain:string){
    for(let i=0; i<wallets.length; i++){
      if(wallets[i].chain==chain){
        return wallets[i]
      }
    }
    return null
  }

  async function sendReceipt(data:any){
    console.log('Sending receipt...', data)
    try {
      const result = await postApi('receipt', data)
      console.log('Receipt sent')
      console.log('Result', result)
      return {success:true}
    } catch(ex:any) {
      console.warn('Error sending receipt', ex)
      return {success:false, error:ex.message}
    }
  }

  async function mintNFT(txid:string, initid:string, donor:string, destin:string, amount:number, rate:number){
    // Mint NFT
    //const imageuri = 'ipfs:QmdmPTsnJr2AwokcR1QC11s1T3NRUh9PK8jste1ngnuDzT'
    //const metadata = 'ipfs:Qme4c3dERwN7xNrC7wyDgbxF4bQ5aS9uNwaeXdXbWTeabh'
    //const imageurl = 'https://gateway.lighthouse.storage/ipfs/QmdmPTsnJr2AwokcR1QC11s1T3NRUh9PK8jste1ngnuDzT'
    //const metaurl  = 'https://gateway.lighthouse.storage/ipfs/Qme4c3dERwN7xNrC7wyDgbxF4bQ5aS9uNwaeXdXbWTeabh'
    setMessage('Minting NFT, wait...')
    const minted = await postApi('nft/mint', {txid, initid, donor, destin, amount, rate})
    console.log('Minted', minted)
    if(!minted?.success){
      setMessage('Error minting NFT')
      return minted
    }
    setMessage(`NFT minted successfully • <a href="${minted.image}" target="_blank">Image</a> • <a href="${minted.metadata}" target="_blank">Meta</a>`)
    return minted
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
      const res = await trx.signAndSend() // Wallet call
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


  async function onAction(){
    //sendPayment(contractId, name, email, organization, initiativeId, amount, currency, usdRate, issuer, destinationTag, yesReceipt, yesNFT)
    //const wallet    = currentWallet?.value || ''
    //const chainName = currentChain
    const chainName = 'Stellar'
    const currency  = 'XLM'
    const amount    = $('amount')?.value || '0'
    const name      = $('name-input')?.value || ''
    const email     = $('email-input')?.value || ''
    const receipt   = $('receipt-check')?.dataset.state=='checked'
    console.log('FORM --------')
    console.log('Currency:', currency)
    console.log('Wallet:',   wallet)
    console.log('Amount:',   amount)
    console.log('Name:',     name)
    console.log('Email:',    email)
    console.log('Receipt:',  receipt)
    //console.log('MintNFT:',  mintnft)
    
    // Validate required data
    if(!parseInt(amount)){
      setMessage('Enter a valid amount')
      return
    }
    if(receipt && !validEmail(email)){
      setMessage('Enter a valid email')
      return
    }

    // Donate and mint
    setButtonText('WAIT')
    setDisabled(true)
    setMessage('Approve payment in your Freighter wallet')

    const orgwallet = getWalletByChain(organization?.wallets, chainName)
    console.log('Org wallet', orgwallet)
    if(!orgwallet || !orgwallet?.address){
      console.log('Error sending payment, no wallet found for chain', chainName)
      setMessage('Error: no wallet in this organization for ' + chainName)
      return
    }
    const address = orgwallet.address
    console.log('Sending payment to', address)

    const destinationTag = initiative.tag
    // if amount in USD convert by coin rate
    const amountNum = parseInt(amount||'0')
    const coinValue = showUSD ? amountNum : (amountNum / usdRate)
    const usdValue  = showUSD ? (amountNum * usdRate) : amountNum
    const rateMsg   = showUSD 
      ? `USD ${usdValue.toFixed(2)} at ${usdRate.toFixed(2)} ${currency}/USD` 
      : `${coinValue.toFixed(2)} ${currency} at ${usdRate.toFixed(2)} ${currency}/USD`
    console.log('AMT', showUSD, coinValue, usdValue)
    setRateMessage(rateMsg)
    const weiValue = Math.trunc(coinValue * 1000000).toString()
    console.log('WEI', weiValue)
    const amountStr = coinValue.toFixed(7)

    await wallet.init()
    const info = await wallet.connect()
    console.log('WALLET', info)
    const donor = info?.account
    console.log('DONOR', donor)
    if(!donor){
      setMessage('Error: Signature rejected by user')
      console.log('Error: Signature rejected by user')
      return
    }

    // Check user exists or create a new one
    let userRes = await fetchApi('users?wallet='+donor)
    console.log('USER', userRes)
    let userInfo = userRes?.result
    const userId = userInfo?.id || ''
    if(!userId){
      //const email = donor.substr(0,10).toLowerCase() + '@example.com'
      const user = await postApi('users', {
        name: 'Anonymous', 
        wallet: donor,
        wallets:{
          create:{
            address: donor,
            chain: chainName
          }
        }
      })
      userInfo = user.data
      console.log('NEWUSER', userInfo)
      if(!userInfo){
        console.log('ERROR', 'Error creating user')
        setMessage('Error: User could not be created')
        return
      }
    }

    // Check network
    const useNetwork = process.env.NEXT_PUBLIC_STELLAR_NETWORK||''
    if(info.network!==useNetwork){
      console.log('Error: Wrong network', info.network)
      console.log('Expected network:', useNetwork)
      setButtonText('DONATE')
      setDisabled(false)
      setMessage('Select '+useNetwork+' network in Freighter Wallet')
      return
    }
    //const memo = destinTag ? 'tag:'+destinTag : ''
    const result = await donate(contractId, donor, amountNum)
    console.log('UI RESULT', result)
    if(!result?.success){
      setMessage('Error sending payment')
      return
    }
    setMessage('Payment sent successfully')

    // Send receipt
    if(receipt){
      //sendReceipt(name, email, organization, amount, currency, rate, issuer)
      console.log('YES receipt...')
      setMessage('Sending receipt, wait a moment...')
      const data = {
        name:     name,
        email:    email,
        org:      organization.name,
        address:  organization.mailingAddress,
        ein:      organization.EIN,
        currency: currency,
        amount:   coinValue.toFixed(2),
        usd:      usdValue.toFixed(2)
      }
      const rec = await sendReceipt(data)
      console.log('Receipt sent', rec)
    }

    const NFTData = {
      status: 'Claim',
      organization: {
        name: organization.name,
        address: organization.mailingAddress,
        ein: organization.EIN
      },
      tag: initiative.tag,
      image: initiative.defaultAsset,
      date: new Date(),
      amount: coinValue,
      ticker: currency,
      amountFiat: usdValue,
      fiatCurrencyCode: 'USD',
      donor: {
        name: name || userInfo?.name || 'Anonymous',
        address
      },
      chainName,
      rate: usdRate,
      txid: result.txid
    }
    //if(!mintnft){ NFTData.status = 'Rejected' }
    setDonation(NFTData)
    setButtonText('DONE')
    setDisabled(true)
    setMessage('Thank you for your donation!')
  }

  const chains = getChainsList()
  const chainLookup = getChainsMap()
  const chainWallets = getChainWallets(chains[0].symbol)

  // TODO: currentChain should be currently selected chain in wallet instead of first one
  const [showUSD, toggleShowUSD] = useState(false)
  const [currentChain, setCurrentChain] = useState('Stellar')
  const [wallets, setWallets] = useState(chainWallets)
  const [currentWallet, setCurrentWallet] = useState(wallets[0])
  const amountInputRef = useRef(null)
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState('Donate')
  const [message, setMessage] = useState('One wallet confirmation required')
  const [rateMessage, setRateMessage] = useState(`0 USD at ${usdRate.toFixed(2)} XLM/USD`)
  const [chartTitle, setChartTitle] = useState('Total estimated carbon emissions retired')
  const [chartValue, setChartValue] = useState(creditCurrent) // TODO: calc aggregate from db
  const [percent, setPercent] = useState('0')
  const [offset, setOffset]   = useState('0.00')

  function amountChanged(evt){
    const currency = 'XLM'
    const amount = evt.target.value || '0'
    const amountNum = parseInt(amount)
    const coinValue = showUSD ? amountNum : (amountNum / usdRate)
    const usdValue  = showUSD ? (amountNum * usdRate) : amountNum
    const rateMsg   = showUSD 
      ? `${usdValue.toFixed(2)} USD at ${usdRate.toFixed(2)} USD/${currency}` 
      : `${coinValue.toFixed(2)} ${currency} at ${usdRate.toFixed(2)} USD/${currency}`
    console.log('AMT', showUSD, coinValue, usdValue)
    setRateMessage(rateMsg)
    const retire = (amount / creditValue).toFixed(2)
    const pct = ((amount>creditValue) ? 100 : (amount / creditValue * 100)).toFixed(2)
    console.log('Amount changed', amount, retire, pct)
    setOffset(retire)
    setPercent(pct)
  }

  return (
    <div className="flex min-h-full w-full">
      <Card className="py-6 w-full">
        <div className="px-6">
          <Label htmlFor="currency-select" className="mb-2">
            Currency
          </Label>
          <DonationFormSelect
            id="currency-select"
            className="mb-6"
            options={chains}
            currentOption={currentChain ?? ''}
            handleChange={(chain: string) => {
              const chainSymbol = Object.keys(chainLookup).length>0 ? chainLookup[chain].symbol : ''
              const listWallets = getChainWallets(chainSymbol)
              setCurrentChain(chain)
              setWallets(listWallets)
            }}
            placeHolderText="...select a cryptocurrency"
          />
          <Label htmlFor="wallet-select" className="mb-2">
            Wallet
          </Label>
          <DonationFormSelect
            id="wallet-select"
            className="mb-6"
            options={wallets}
            currentOption={currentWallet?.value ?? ''}
            handleChange={(wallet: { value: string; image: string }) =>
              setCurrentWallet(wallet)
            }
            placeHolderText="...select a cryptowallet"
          />
        </div>
        <Separator />
        <div className="px-6">
          <div className="my-10 text-center">
            <Chart title={chartTitle} goal={creditGoal} value={chartValue} />
            <p className="mt-12 mb-4">Your donation will offset {offset} tons of carbon</p>
            <Progressbar value={percent} />
          </div>
          <div className="w-full my-6">
            <div className="flex flex-row justify-between items-center mb-2">
              <Label>Amount</Label>{' '}
              <div className="flex flex-wrap">
                <Label htmlFor="show-usd-toggle">USD</Label>
                <Switch
                  id="show-usd-toggle"
                  valueBasis={showUSD}
                  handleToggle={() => {
                    toggleShowUSD(!showUSD)
                  }}
                />
                <Label>{chainLookup[currentChain]?.symbol}</Label>
              </div>
            </div>
            <div className="my-auto">
              <InputWithContent
                className="pl-4"
                type="text"
                id="amount"
                text={ showUSD ? '| ' + chainLookup[currentChain]?.symbol : '| USD' }
                divRef={amountInputRef}
                onChange={amountChanged}
              />
            </div>
            <Label className="block mt-2 text-right">{rateMessage}</Label>
          </div>
          <Label htmlFor="name-input" className="mb-2">Name (optional)</Label>
          <Input type="text" className="pl-4 mb-6" id="name-input" />
          <Label htmlFor="email-input" className="mb-2">Email address (optional)</Label>
          <Input type="text" className="pl-4 mb-6" id="email-input" />
          <CheckboxWithText id="receipt-check" text="I'd like to receive an emailed receipt" className="mb-2" />
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-center">
          <Button disabled={disabled} className="mt-6 mx-6 w-[250px] h-[50px] bg-blue-600 text-white text-lg outline outline-slate-300 outline-1 hover:bg-blue-700 hover:shadow-inner" onClick={onAction}>
            {buttonText}
          </Button>
          <p className="mt-2 text-sm">{message}</p>
        </div>
      </Card>
    </div>
  )
}
