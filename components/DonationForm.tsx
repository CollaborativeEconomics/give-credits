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
import { networks } from '@/contracts/networks'
import { fetchApi, postApi } from '@/utils/api'
import {signTransaction} from "@stellar/freighter-api"
import { BASE_FEE, Account, Address, Asset, Contract, Horizon, Keypair, Networks, Operation, SorobanRpc, Transaction, TransactionBuilder, nativeToScVal, scValToNative } from '@stellar/stellar-sdk'
//import { Contract } from '@/contracts/credits/client'


export default function DonationForm(props:any) {
  //console.log('Props', props)
  const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK||'testnet'
  console.log('NETENV', network)
  const initiative = props.initiative
  const contractId = initiative.contractcredit
  //const contractId = 'CBZ62WGTRYNMCNNRBQHGGEDBPIA4VXCHNFSICDKLP3CFNGF3H4WD3OQC' // mainnet
  //const contractId = 'CAE5MDQ7IZSWPC2P2SPH3V65HYZKN55RY74S7IQ24WL4BXOIFCJPM36N' // futurenet
  //const contractId = 'CCUZYZPNVGXH7TDKRRC25KMZ3DIM6JDLLU2SLZ6LIWFKS6XYQQKQZAV3' // testnet
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

//type Tx = Transaction<Memo<MemoType>, Operation[]>

  // Contract call
  async function donate(contractId:string, from:string, amount:number) {
    try {
      console.log('-- Donating', contractId, from, amount)
      const net = networks[network]
      const rpc = net.soroban
      const url = net.horizon
      console.log('NET', net)
      const adr = new Address(from).toScVal()
      //const wei = BigInt(amount*10000000) // 7 decs
      const wei = nativeToScVal(amount*10000000, { type: 'i128' })
      //const args = {from:adr, amount:wei}
      const args = [adr, wei]
      console.log('ARGS', args)
      const ctr = new Contract(contractId)
      console.log('CTR', ctr)
      const op = ctr.call('donate', ...args)
      //const op = ctr.call('donate', args)
      console.log('OP', op)
      const horizon = new Horizon.Server(url, { allowHttp: true })
      const soroban = new SorobanRpc.Server(rpc, { allowHttp: true })
      //const account = await horizon.loadAccount(from)
      const account = await soroban.getAccount(from)
      console.log('ACT', account)
      const base = await horizon.fetchBaseFee()
      const fee = base.toString()
      const trx = new TransactionBuilder(account, {fee, networkPassphrase: net.passphrase})
        .addOperation(op)
        .setTimeout(30)
        .build()
      console.log('TRX', trx)
      const sim = await soroban.simulateTransaction(trx);
      console.log('SIM', sim)
      if (SorobanRpc.Api.isSimulationSuccess(sim) && sim.result !== undefined) {
        console.log('RES', sim.result)
        // Now prepare it???
        const txp = await soroban.prepareTransaction(trx)
        console.log('TXP',txp)
        const xdr = txp.toXDR()
        console.log('XDR', xdr)
        // Now sign it???
        const opx = {networkPassphrase: net.passphrase}
        //const opx = {network:net.name, networkPassphrase: net.passphrase, accountToSign: from}
        console.log('OPX', opx)
        //const res = await wallet.signAndSend(xdr, opx)
        const sgn = await signTransaction(xdr, opx)
        console.log('SGN', sgn)
        // Now send it?
        const txs = TransactionBuilder.fromXDR(sgn, net.passphrase) // as Tx
        console.log('TXS', txs)
        //const six = await soroban.simulateTransaction(txs)
        //console.log('SIX', six)
        //const prep = await soroban.prepareTransaction(six)
        //console.log('PREP', prep)
        ////const res = await soroban.sendTransaction(sgn)
        //const res = await soroban.sendTransaction(txs)
        const res = await soroban.sendTransaction(txs)
        console.log('RES', res)
        console.log('JSN', JSON.stringify(res,null,2))

        const txid = res?.hash || ''
        console.log('TXID', txid)
        if(res?.status.toString() == 'SUCCESS'){
          return {success:true, txid, error:null}
        } else {
          // Wait for confirmation
          const secs = 1000
          const wait = [2,2,2,3,3,3,4,4,4,5,5,5] // 42 secs / 12 loops
          let count = 0
          let info = null
          while(count < wait.length){
            console.log('Retry', count)
            await new Promise(res => setTimeout(res, wait[count]*secs))
            count++
            info = await soroban.getTransaction(txid)
            console.log('INFO', info)
            if(info.status=='NOT_FOUND' || info.status=='PENDING') {
              continue // Not ready in blockchain?
            }
            if(info.status=='SUCCESS'){
              return {success:true, txid, error:null}
            } else if(info.status!=='PENDING') {
              return {success:false, txid:'', error:'Error sending payment (951)'} // get error
            }
          }
          return {success:false, txid:'', error:'Error sending payment (952)'} // get error
        }
      } else {
        console.log('BAD', sim)
        return {success:false, txid:'', error:'Error sending payment (953)'} // get error
      }
    } catch(ex) {
      console.log('ERROR', ex)
      return {error:ex.message}
    }
  }

/*
  async function donateX(contractId:string, from:string, amount:number) {
    try {
      console.log('-- Donating', contractId, from, amount)
      const net = networks[network]
      console.log('NET', net)
      //const net = networks.mainnet
      //const svr = new SorobanRpc.Server(net.soroban)
      //const svr = new SorobanRpc.Server(net.soroban, { allowHttp: net.soroban.startsWith('http:') })
      //const act = await svr.getAccount(from)
      //console.log('ACT', act)
      //const seq = act.sequence.toString()
      //console.log('SEQ', seq)

      //const opt = {...net, contractId}
      const opt = {networkPassphrase:net.passphrase, rpcUrl:net.soroban, contractId, signTransaction:(xdr: string) => signTransaction(xdr, 'testnet')}
      console.log('OPT', opt)
      const ctr = new Contract(opt)
      //const ctr = new Contract(contractId)
      console.log('CTR', ctr)
      const wei = BigInt(amount*10000000) // 7 decs
      //const dat = [from, wei]
      const dat = {from, amount:wei}
      console.log('DAT', dat)

      //const adr = new Address(from).toScVal()
      //const wey = nativeToScVal(amount*10000000, { type: 'i128' })
      //const args = {from:adr, amount:wey}
      //const args = [adr, wei]


      const trx = await ctr.donate(dat)
      console.log('TRX', trx)
      //trx.raw.source = act
      //const opr = trx.raw.operations[0];
      //console.log('OPR', opr)
      //const arg = new Address(target).toScVal()
      //const opy = ctr.call('method', dat)
      //console.log('OPy', opy)

      //trx.raw = new TransactionBuilder(act, {
      //  fee: trx.raw.baseFee,
      //  networkPassphrase: trx.options.networkPassphrase,
      //})
      //  .setTimeout(30)
      //  .addOperation(Operation.invokeHostFunction({ opr, auth: opr.auth ?? [] }))
      //  .build();
      //await trx.simulate()

      //const txb = new TransactionBuilder(act, { fee: BASE_FEE, networkPassphrase: net.passphrase })
      //  .addOperation(opr)
      //  .setTimeout(30)
      //  .build()
      
      const soroban = new SorobanRpc.Server(net.soroban, { allowHttp: true })
      const sim = await trx.simulate()
      //const sim = await soroban.simulateTransaction(trx);
      //console.log('SIM', sim)
      
      const trp = await soroban.prepareTransaction(trx.built)
      console.log('TRP', trp)

      const xdr = trp.toXDR()
      console.log('XDR', xdr)
      
      //const opx = {network:net.name, networkPassphrase: net.passphrase, accountToSign: from}
      const opx = {networkPassphrase: net.passphrase}
      console.log('OPX', opx)
      
      //trx.raw.source = act
      //const sin = await trx.simulate()
      //console.log('SIN', sin)
      //const xdr = sin.raw.build().toXDR()
      //trx.built.addSignature(from, signature)
      //const xdr = trx.raw.build().toXDR()

      //const res = await wallet.signAndSend(xdr, opx)
      //const res = await trx.signAndSend()
      
      const sgn = await signTransaction(xdr, opx)
      console.log('SGN', sgn)
      // Now send it?
      const txs = TransactionBuilder.fromXDR(sgn, net.passphrase) as Tx
      console.log('TXS', txs)
      const res = await soroban.sendTransaction(txs)
      console.log('RES', res)
      console.log('JSN', JSON.stringify(res,null,2))

      //console.log('RES2', res.sendTransactionResponse)
      //console.log('RES3', res.getTransactionResponse)
      //console.log('RES4', res.getTransactionResponse?.status)
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
*/

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
    console.log('ContractID:', contractId)
    
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
    const receiver = orgwallet.address
    console.log('Sending payment to', receiver, 'in contract', contractId)

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
    const weiValue = Math.trunc(coinValue * 10000000).toString()
    console.log('WEI', weiValue)
    const amountStr = coinValue.toFixed(7)

    await wallet.init()
    const info = await wallet.connect()
    console.log('WALLET', info)
    // Check network
    const stellarNet = process.env.NEXT_PUBLIC_STELLAR_NETWORK||''
    const useNetwork = stellarNet=='mainnet' ? 'public' : stellarNet
    //if(info.network!==useNetwork){
    //  if(stellarNet=='mainnet'){
    //    console.log('Error: Wrong network', info.network)
    //    console.log('Expected network:', useNetwork)
    //    setButtonText('DONATE')
    //    setDisabled(false)
    //    setMessage('Select '+stellarNet+' network in Freighter Wallet')
    //    return
    //  }
    //}

    const donor = info?.account
    console.log('DONOR', donor)
    if(!donor){
      setMessage('Error: Signature rejected by user')
      console.log('Error: Signature rejected by user')
      return
    }

    // Check user exists or create a new one
    const userRes = await fetchApi('users?wallet='+donor)
    let userInfo = userRes?.result || null
    //console.log('USER', userInfo)
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

    //const memo = destinTag ? 'tag:'+destinTag : ''
    const result = await donate(contractId, donor, amountNum)
    console.log('UI RESULT', result)
    if(!result?.success){
      setMessage('Error sending payment')
      return
    }
    setMessage('Payment sent successfully')

    // Save donation to DB
    const catId = initiative.categoryId || organization.categoryId 
    const donation = {
      organizationId: organization.id,
      initiativeId:   initiative.id,
      categoryId:     catId,
      userId:         userInfo?.id,
      paytype:        'crypto',
      chain:          chainName,
      network:        network,
      wallet:         donor,
      amount:         coinValue,
      usdvalue:       usdValue,
      asset:          currency,
      status:         1
    }
    console.log('DONATION', donation)
    const res = await postApi('donations', donation)
    console.log('RES', res)
    if(!res.success){
     setButtonText('ERROR')
     setDisabled(true)
     setMessage('Error saving donation in database')
     return
    }
    //const donationId = res.data?.id

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
      initiativeId: initiative.id,
      tag: initiative.tag,
      image: initiative.defaultAsset,
      date: new Date(),
      amount: coinValue,
      ticker: currency,
      amountFiat: usdValue,
      fiatCurrencyCode: 'USD',
      donor: {
        address: donor,
        name: name || userInfo?.name || 'Anonymous'
      },
      receiver,
      contractId,
      chainName,
      rate: usdRate,
      txid: result.txid
    }
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
    console.log('REF', amountInputRef)
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
          <Button disabled={disabled} className="mt-6 mx-6 w-[250px] h-[50px] bg-lime-600 text-white text-lg outline outline-slate-300 outline-1 hover:bg-green-600 hover:shadow-inner" onClick={onAction}>
            {buttonText}
          </Button>
          <p className="mt-2 text-sm">{message}</p>
        </div>
      </Card>
    </div>
  )
}
