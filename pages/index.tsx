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


import Main from '@/components/ui/main'
import VideoBackground from '@/components/home/VideoBackground'
import ImpactCarousel from '@/components/home/ImpactCarousel'
import ActionBar from '@/components/home/ActionBar'
import InstructionPanes from '@/components/home/InstructionPanes'
import { getInitiatives } from '@/utils/registry'


export async function getServerSideProps() {
  const data = await getInitiatives()
  const initiatives = data.filter((it:any)=>!it.inactive)
  return { props: { initiatives } }
}

export default function Home(props:any) {
  // @ts-ignore: Typescript sucks donkey balls
  const {config, setConfig} = useContext(ConfigContext)
  console.log('CONFIG INDEX', config)
  const router = useRouter()
  const [loginText, setLoginText] = useState(config.user=='' ? 'LOGIN' : 'PROFILE '+config.wallet.substr(0,10))
  const [logged, setLogged] = useState(config.user!=='')
  const [userId, setUserId] = useState(config.user)

  const query = props?.searchParams?.query || ''
  const category = props?.searchParams?.category || ''
  const location = props?.searchParams?.location || ''
  const initiatives = props.initiatives
  console.log('SEARCH', query, category, location)


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
      <div className="w-full top-0">
        <div className="container mt-48 mb-16 ml-6 md:ml-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-accent-foreground">
            Blockchain-driven philanthropy <br />
            for a transparent world
          </h1>
          <p className="pt-4 w-[95%] md:w-[60%]">
            With the increased transparency that blockchain donations provide,
            meaningful initiatives combine with donor generosity to tell the
            story of real world impact.
          </p>
        </div>
        <ImpactCarousel initiatives={initiatives} />
        <ActionBar />
        <InstructionPanes />
        <VideoBackground />
      </div>
    </>
  )
}
