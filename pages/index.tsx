import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link  from 'next/link'
import Page  from 'components/page'
import Card  from 'components/card'
import Tile  from 'components/tile'
//import Button from '../components/button'
import { isConnected, getPublicKey } from "@stellar/freighter-api"
import { ConfigContext } from 'components/config' 
import { fetchApi, postApi } from 'utils/api'


export default function Home() {
  // @ts-ignore: Typescript sucks donkey balls
  const {config, setConfig} = useContext(ConfigContext)
  console.log('CONFIG INDEX', config)
  const router = useRouter()
  const [loginText, setLoginText] = useState(config.user=='' ? 'LOGIN' : 'PROFILE '+config.wallet.substr(0,10))
  const [logged, setLogged] = useState(config.user!=='')
  const [userId, setUserId] = useState(config.user)

  function onLogin(){
    console.log('LOGIN')
    if(!logged){
      getPublicKey().then(address=>{
        console.log('Wallet', address)
        setLogged(true)
        setLoginText('PROFILE '+address.substr(0,10)+'...')
        fetch('/api/users?wallet='+address).then(res=>{
          res.json().then(user=>{
            console.log('User', user)
            if(user){
              console.log('UserId', user.id)
              setUserId(user.id)
              setConfig({...config, wallet:address, user:user.id})
            } else {
              const body = JSON.stringify({
                name: 'Anonymous', 
                wallet: address,
                wallets:{
                  create:{
                    address: address,
                    chain: 'Stellar'
                  }
                }
              })
              fetch('/api/users', {method:'POST', headers: { 'Content-Type': 'application/json' }, body}).then(rex=>{
                rex.json().then(newUser=>{
                  const userInfo = newUser.data
                  console.log('NEWUSER', userInfo)
                  if(!userInfo){
                    console.log('Error creating user')
                  }
                })
              })
            }
          })
        })
      })
    } else {
      if(userId){
        router.push('/profile/'+userId)
      }
    }
  }
  
  return (
    <>
      <Page>
        <div className="mb-6 text-center">
          <h1 className="text-4xl">Be the change!</h1>
          Donate to causes you believe in with XLM, save the
          world retiring carbon credits, get limited edition NFTs, and reduce tax liability
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Tile 
            text="Donate"
            icon="volunteer_activism"
            href="/organizations"
          />
          <Link href="/organizations/04340418-765d-48ab-af36-512a66c960b4">
            <Card className="h-full p-4">
              <div className="h-full w-full flex flex-col justify-between items-center">
                <Image
                  src="/media/publicnode.png"
                  alt="Public Node"
                  width={200}
                  height={120}
                  className="mt-4"
                />
                <h4 className="self-center font-bold uppercase">Featured</h4>
              </div>
            </Card>
          </Link>
          <Tile text="Receipts" icon="receipt_long" href="/receipts" />
          <Tile text="My NFTS" icon="collections" href="/nfts" />
        </div>
        <div className="mt-5">
          <Card><button className="w-full py-3 text-center" onClick={onLogin}>{loginText}</button></Card>
        </div>
        <div className="mt-5">
          <div className="text-center ">
            <p className="text-xl">We use Freighter wallet for Soroban Network</p>
            <li className="list-none">
              Download <Link href={'https://www.freighter.app/'} target="_blank">Freighter</Link> wallet
            </li>
            <p className="text-sm text-slate-400 mt-4">You will need to have XLM in a wallet that supports Soroban Network, such as Freighter.  Freighter is a secure, non-custodial, end-to-end encrypted, blockchain wallet. You can learn more in their website.</p>
            <p className="text-xl mt-4">DEV BRANCH</p>
          </div>
        </div>
      </Page>
    </>
  )
}
