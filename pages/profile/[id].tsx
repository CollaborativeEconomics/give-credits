import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Page from '@/components/page'
import { getUserById, getNFTsByAccount, getDonationsByUser, getFavoriteOrganizations, getUserBadges, getRecentStories } from '@/utils/registry'
import TableDonations from '@/components/tabledonations'
import NotFound from '@/components/NotFound'
import StoryCard from '@/components/StoryCard'
import { ConfigContext } from '@/components/config' 

type Dictionary = { [key: string]: any }

export async function getServerSideProps({ req, res, query }:any){
  console.log(query)
  const userId = query?.id || ''
  const user = await getUserById(userId) || null
  if(!user){
    return { props: {userId, user:null, receipts:[], donations:[], favorgs:[], badges:[], stories:[]} }
  }
  const receipts:[Dictionary]  = await getNFTsByAccount(userId) || []
  const donations:[Dictionary] = await getDonationsByUser(userId) || []
  const favorgs:[Dictionary]   = await getFavoriteOrganizations(userId) || []
  const badges:[Dictionary]    = await getUserBadges(userId) || []
  const stories:[Dictionary]   = await getRecentStories(5) || []
  return { props: {userId, user, receipts, donations, favorgs, badges, stories} }
}

export default function Profile(props: any) {
  const {userId, user, receipts, donations, favorgs, badges, stories} = props
  if(!user){ return NotFound() }
  // @ts-ignore: Typescript sucks donkey balls
  const {config, setConfig} = useContext(ConfigContext)
  console.log('CONFIG PROFILE', config)

  const nopic = '/media/nopic.png'

  function logout(){
    setConfig({...config, wallet:'', user:''})
  }

  return (
    <Page>
      <div className="flex flex-row justify-between">

        {/* Avatar */}
        <div className="border rounded-md p-8 w-1/3 bg-white opacity-80 w-full">
          <div className="flex flex-row flex-start items-center rounded-full">
            <Image className="mr-20 rounded-full" src={user.image||nopic} width={100} height={100} alt="Avatar" />
            <div className="flex flex-col flex-start items-start rounded-full text-black">
              <h1 className="font-bold text-lg">{user.name}</h1>
              <h2 className="">{user.email}</h2>
              <h2 className="">{user.wallet.substr(0,16)+'...'}</h2>
              <button className="mt-4 py-1 px-4 rounded text-black bg-gray-300" onClick={logout}>Log out</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mid Section */}
      <div className="mt-12 flex flex-col">

        {/* Panel */}
        <div className="w-full">
          
          {/* Fav Orgs */}
          <h1 className="text-2xl font-medium">Favorite Organizations</h1>
          {favorgs.length>0 
            ? ( 
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {favorgs.map((item:any)=>{
                    const org = item.organization
                    return (
                      <div key={org.id} className="flex flex-row justify-start items-center content-center mt-4">
                        <Image className="rounded-full mr-1" src={org.image} width={64} height={64} alt="Organization" />
                        <h1 className="text-sm text-center">{org.name}</h1>
                      </div>
                    )
                  })}
                </div>
              )
            : (
                <div className="mb-8 w-full text-gray-400">
                  <h1>No favorite organizations found</h1>
                </div>
              )
          }
          
          {/* Badges */}
          <h1 className="text-2xl font-medium">Badges</h1>
          {badges.length>0 
            ? ( 
                <div className="grid grid-cols-4 gap-2 mb-8 w-full">
                  {badges.map((item:any)=>{
                    const badge = item.category
                    return (<Image key={badge.id} className="mr-1" src={badge.image} width={72} height={72} alt="Badge" />)
                  })}
                </div>
              )
            : (
                <div className="mb-8 w-full text-gray-400">
                  <h1>No badges found</h1>
                </div>
              )
          }

          {/* Stories */}
          <h1 className="text-2xl font-medium">Recent Stories</h1>
          {stories.length>0 
            ? ( 
                <div className="">
                  {stories.map((story:any)=>{
                    return (
                      <div className="my-4" key={story.id}>
                        <StoryCard story={story} />
                      </div>
                    )
                  })}
                </div>
              )
            : (
                <div className="mb-8 w-full text-gray-400">
                  <h1>No stories found</h1>
                </div>
              )
          }
        </div>

        {/* Donations */}
        <div className="w-full">
          <h1 className="text-2xl font-medium mb-4">Donations</h1>
          {donations.length>0 
            ? ( 
                <div className="w-full rounded-md p-10 bg-green-800 text-white">
                  <TableDonations donations={donations} />
                </div>
              )
            : (
                <div className="mb-8 w-full text-gray-400">
                  <h1>No donations found</h1>
                </div>
              )
          }
        </div>
      </div>
    </Page>
  )
}
