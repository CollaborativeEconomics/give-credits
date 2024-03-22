import Image from 'next/image'
import MainChart from '@/components/mainchart'
import { getInitiatives } from '@/utils/registry'

export default async function Home(props: any) {
  const query = props?.searchParams?.query || ''
  const category = props?.searchParams?.category || ''
  const location = props?.searchParams?.location || ''
  const data = await getInitiatives()
  const initiatives = data.filter((it:any)=>!it.inactive)

  const goal = 135
  const current = 30
  const date = new Date()

  console.log('SEARCH', query, category, location)
  return (
    <>
      <div className="w-full">

        {/* HERO */}
        <div className="h-[456px] mt-32 mb-16 pt-0 text-center bg-[url('/newui/bg-green.jpg')] bg-center">
          <div className="py-48 bg-black/50">
            <h1 className="text-white text-4xl font-extrabold tracking-tight lg:text-5xl">
              Donate Carbon Credits
            </h1>
            <h2 className="text-white">Make tax-deductible donations of carbon credits to worthy non-profits</h2>
          </div>
        </div>

        {/* INTRO */}
        <div className="container flex flex-col">
          <div className="text-center">
            <h1 className="mt-12 text-4xl font-normal tracking-tight lg:text-5xl">FEATURED PROJECT</h1>
          </div>
          <div className="flex flex-row justify-center my-12">
            <Image src="/newui/logoleaf.png" width={384} height={384} alt="Stellar green" className="aspect-square" />
            <div className="ml-12">
              <h2 className="mt-6 mb-4 text-4xl font-bold">Towards a Carbon-Neutral Stellar Blockchain</h2>
              <p className="py-3">We have partnered with Public Node and Stellar Carbon to allow XLM holders to help make Stellar a carbon-neutral chain!</p>
              <p className="py-3">When you make a donatio to Public Node (a registered 501C3 non-profit), Soroban smart contracts automatically allocate funds into chunks to purchase carbon credits, and vou receive a receipt NFT showing the estimated offset</p>
              <p className="py-3">Once the carbon credit has been retired, an NFT showing the number of credits retired is minted</p>
              <div className="flex flex-row mt-6">
                <Image src="/newui/stellarcarbon.png" width={300} height={100} alt="Stellar Carbon" />
                <Image src="/newui/publicnode.png" width={500} height={125} alt="Public Node" className="ml-12" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="px-12 py-4 text-2xl text-green-600 rounded-full border shadow-xl">Contribute Now</button>
          </div>
        </div>

        <div className="flex flex-col mt-16 bg-[url('/newui/bg.jpg')] bg-center bg-bottom bg-no-repeat">
          {/* CHART */}
          <div className="container">
            <div className="flex flex-col w-[920px] rounded-lg bg-slate-400 justify-center items-center mx-auto mt-16 p-12 shadow-xl">
              <h2 className="mb-4 text-white text-4xl font-bold">12% Carbon Neutral</h2>
              <MainChart goal={goal} value={current} date={date} />
              <p className="mt-4 text-white">5 out of 37 tons of carbon offset for 2024, as of March 15, 2024</p>
            </div>
          </div>

          {/* CREDITS */}
          <div className="h-[400px] flex flex-col mt-16">
            <div className="text-center">
              <h2 className="mt-6 mb-4 text-white text-4xl font-bold">Recent Carbon Credit Retirements</h2>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
