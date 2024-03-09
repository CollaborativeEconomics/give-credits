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
import Chains from '@/libs/chains/client/apis'
import getRates from '@/utils/rates'

export default function DonationForm(props:any) {
  //console.log('Props', props)
  const initiative = props.initiative
  const organization = initiative.organization
  const {donation, setDonation} = useContext(DonationContext)

  function $(id:string){ return document.getElementById(id) as HTMLInputElement }

  function validEmail(text:string){
    return text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  }

/*
  function getWalletByChain(wallets:[any], chain:string){
    for(let i=0; i<wallets.length; i++){
      if(wallets[i].chain==chain){
        return wallets[i]
      }
    }
    return null
  }
*/
  async function sendReceipt(data:any){
    console.log('Sending receipt...', data)
    try {
      const opts = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(data)
      }
      const response = await fetch('/api/receipt', opts)
      console.log('Receipt sent')
      const result = await response.json()
      console.log('Result', result)
      return {success:true}
    } catch(ex:any) {
      console.warn('Error sending receipt', ex)
      return {success:false, error:ex.message}
    }
  }


  async function donate(){
    const chainName = currentChain
    //const chainInfo = chainLookup[chainName]
    const wallet    = currentWallet?.value || ''
    //const currency  = chainInfo?.symbol || ''
    const currency  = 'XLM'
    const amount    = $('amount')?.value || '0'
    const name      = $('name-input')?.value || ''
    const email     = $('email-input')?.value || ''
    const receipt   = $('receipt-check')?.dataset.state=='checked'
    //const mintnft   = $('mintnft-check')?.dataset.state=='checked'
    console.log('FORM --------')
    //console.log('Chain:',    chainName)
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

    //const chainText = chainName.startsWith('Ethereum') ? 'Ethereum' : chainName
    //const orgwallet = getWalletByChain(organization?.wallets, chainText)
    const orgwallet = {name:'Freighter', address:'G123...'}
    console.log('Org wallet', orgwallet)
    if(!orgwallet || !orgwallet?.address){
      console.log('Error sending payment, no wallet found for chain', chainName)
      setMessage('Error: no wallet in this organization for ' + chainName)
      return
    }
    const address = orgwallet.address
    const sdk = Chains['Stellar']
    //const sdk = null
    if(!sdk){
      console.log('Error sending payment, blockchain not implemented', chainName)
      setMessage('Error: '+ chainName+' blockchain not implemented')
      return
    }
    const network = sdk.network
    const destinationTag = initiative.tag
    // TODO: if amount in USD convert by coin rate
    const rate = await getRates(currency, true) // get from server, CORS sucks 
    const amountNum = parseInt(amount)
    const coinValue = showUSD ? amountNum : (amountNum / rate)
    const usdValue  = showUSD ? (amountNum * rate) : amountNum
    const rateMsg   = showUSD 
      ? `USD ${usdValue.toFixed(2)} at ${rate.toFixed(2)} ${currency}/USD` 
      : `${coinValue.toFixed(2)} ${currency} at ${rate.toFixed(2)} ${currency}/USD`
    console.log('AMT', showUSD, coinValue, usdValue)
    setRateMessage(rateMsg)
    sdk.sendPayment(address, coinValue, destinationTag, async (result:any)=>{
      if(result?.error){
        console.log('Error sending payment', result.error)
        setMessage('Error sending payment')
        return
      }
      if(result?.success==false){
        console.log('Payment rejected')
        setMessage('Payment rejected by user')
        //router.push(`/donation_failed`);
        return
      }
      console.log('TXID', result.txid)
      console.log('ADDR', result.address)
      console.log('ORG', organization)

      // Save donation to DB
      const catId = initiative.categoryId || organization.categoryId 
      const retx = await fetch('/api/user?wallet='+result.address)
      const resx = await retx.json()
      const user = resx.result
      console.log('USER', user)
      const donation = {
        organizationId: organization.id,
        initiativeId:   initiative.id,
        categoryId:     catId,
        userId:         user?.id,
        paytype:        'crypto',
        chain:          chainName,
        network:        network,
        wallet:         result.address,
        amount:         coinValue,
        usdvalue:       usdValue,
        asset:          currency,
        status:         1
      }
      console.log('DONATION', donation)
      const opt = {method:'POST', body:JSON.stringify(donation)}
      const ret = await fetch('/api/donations', opt)
      const res = await ret.json()
      console.log('RES', res)
      if(!res.success){
       setButtonText('ERROR')
       setDisabled(true)
       setMessage('Error saving donation')
       return
      }
      const donationId = res.data?.id

      // Send receipt
      if(receipt){
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
          name: name || user?.name || 'Anonymous',
          address
        },
        chainName,
        rate,
        txid: result.txid
      }
      //if(!mintnft){ NFTData.status = 'Rejected' }
      setDonation(NFTData)
      setButtonText('DONE')
      setDisabled(true)
      setMessage('Thank you for your donation!')
    })
  }

  const chains = getChainsList()
  const chainLookup = getChainsMap()
  const chainWallets = getChainWallets(chains[0].symbol)

  // TODO: Get rate after chain selected?
  // TODO: currentChain should be currently selected chain in wallet instead of first one
  const [showUSD, toggleShowUSD] = useState(false)
  const [currentChain, setCurrentChain] = useState('Stellar')
  const [wallets, setWallets] = useState(chainWallets)
  const [currentWallet, setCurrentWallet] = useState(wallets[0])
  const amountInputRef = useRef(null)
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState('Donate')
  const [message, setMessage] = useState('One wallet confirmation required')
  const [rateMessage, setRateMessage] = useState('USD conversion rate')

  //console.log({wallets})
  //console.log({currentChain})
  //console.log({currentWallet})
  
  //const { register, watch, handleSubmit, formState } = useForm({
  //  defaultValues: { amount:0, name: '', email: '', receipt: false, mintnft: false }
  //})
  //const { errors } = formState
  //const [amount, name, email, receipt, mintnft] = watch(['amount', 'name', 'email', 'receipt', 'mintnft'])

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
              />
            </div>
            <Label className="block mt-2 text-right">{rateMessage}</Label>
          </div>
          <Label htmlFor="name-input" className="mb-2">
            Name (optional)
          </Label>
          <Input type="text" className="pl-4 mb-6" id="name-input" />
          <Label htmlFor="email-input" className="mb-2">
            Email address (optional)
          </Label>
          <Input type="text" className="pl-4 mb-6" id="email-input" />
          <CheckboxWithText
            id="receipt-check"
            text="I'd like to receive an emailed receipt"
            className="mb-2"
          />
          {/*<CheckboxWithText
            id="mintnft-check"
            text="I'd like to receive an NFT receipt"
            className="mb-6"
          />*/}
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-center">
          <Button disabled={disabled} className="mt-6 mx-6 w-[250px] h-[50px] bg-blue-600 text-white text-lg outline outline-slate-300 outline-1 hover:bg-blue-700 hover:shadow-inner" onClick={donate}>
            {buttonText}
          </Button>
          <p className="mt-2 text-sm">{message}</p>
        </div>
      </Card>
    </div>
  )
}
