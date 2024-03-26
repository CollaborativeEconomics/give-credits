<<<<<<< Updated upstream
//import Main from '@/components/ui/main'
// import ImpactCarousel from '@/components/home/ImpactCarousel';
import ActionBar from '@/components/home/ActionBar';
import InstructionPanes from '@/components/home/InstructionPanes';
// import VideoBackground from '@/components/home/VideoBackground';
import ParallaxHero from '@/components/home/ParallaxHero';
// import { getInitiatives } from '@/utils/registry';
import Image from 'next/image';
import Link from 'next/link';
import MainChart from '@/components/mainchart';
import StoryCard from '@/components/StoryCardCompactVert';
import { getRecentStories, getCreditsByInitiative } from '@/utils/registry';

//import Image from 'next/image'
//import Link from 'next/link'
=======
import Image from 'next/image'
import Link from 'next/link'
import ParallaxHero from '@/components/home/ParallaxHero'
import MainChart from '@/components/mainchart'
import StoryCard from '@/components/StoryCardCompactVert'
import { getRecentStories, getCreditsByInitiative } from '@/utils/registry'
>>>>>>> Stashed changes

export default async function Home(props: any) {
  const query = props?.searchParams?.query || '';
  const category = props?.searchParams?.category || '';
  const location = props?.searchParams?.location || '';
  // const data = await getInitiatives();
  // const initiatives = data.filter((it: any) => !it.inactive);

  console.log('SEARCH', query, category, location);

  const initid = '30c0636f-b0f1-40d5-bb9c-a531dc4d69e2';
  const featured = '/initiatives/30c0636f-b0f1-40d5-bb9c-a531dc4d69e2';
  const stories = await getRecentStories(4);
  const credits = await getCreditsByInitiative(initid);
  const credit = credits.length > 0 ? credits[0] : null;
  const goal = credit?.goal ?? 0;
  const current = credit?.current ?? 0;
  const percent = ((current * 100) / goal).toFixed(0);
  const date = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>

      <div className="w-full h-screen">

        <div className="h-[456px] mt-32 mb-16 pt-0 text-center">
          <ParallaxHero />
        </div>

        {/* HERO */}
        <div className="bg-white relative">
          {/* <InstructionPanes /> */}

          {/* INTRO */}
          <div className="container flex flex-col">
            <div className="text-center">
              <h1 className="mt-12 text-4xl font-normal tracking-tight lg:text-5xl">
                FEATURED PROJECT
              </h1>
            </div>
            <div className="flex flex-row justify-center my-12">
              <Image
                src="/newui/logoleaf.png"
                width={384}
                height={384}
                alt="Stellar green"
                // className="aspect-square"
              />
              <div className="ml-12">
                <h2 className="mt-6 mb-4 text-4xl font-bold">
                  Towards a Carbon-Neutral Stellar Blockchain
                </h2>
                <p className="py-3">
                  We have partnered with Public Node and Stellar Carbon to allow
                  XLM holders to help make Stellar a carbon-neutral chain
                </p>
                <p className="py-3">
                  When you make a donation to Public Node (a registered 501C3
                  non-profit), Soroban smart contracts automatically allocate
                  funds into chunks to purchase carbon credits, and you receive
                  a receipt NFT showing the estimated offset
                </p>
                <p className="py-3">
                  Once the carbon credit has been retired, an NFT showing the
                  number of credits retired is minted
                </p>
                <div className="flex flex-row mt-6">
                  <Image
                    src="/newui/stellarcarbon.png"
                    width={300}
                    height={100}
                    alt="Stellar Carbon"
                  />
                  <Image
                    src="/newui/publicnode.png"
                    width={500}
                    height={125}
                    alt="Public Node"
                    className="ml-12"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mb-12">
              <Link
                href={featured}
                className="px-12 py-4 text-2xl text-green-600 rounded-full border shadow-xl"
              >
                Contribute Now
              </Link>
            </div>
          </div>

          <div className="flex flex-col mt-16 bg-[url('/newui/bg.jpg')] bg-center bg-bottom bg-no-repeat">
            {/* CHART */}
            <div className="container pt-24">
              <div className="flex flex-col w-[920px] rounded-lg bg-slate-400 bg-[#00000022] justify-center items-center mx-auto mt-16 p-12 shadow-xl">
                <h2 className="mb-12 text-white text-4xl font-bold">
                  {percent}% Carbon Neutral
                </h2>
                <MainChart goal={goal} value={current} />
                <p className="mt-4 text-white">
                  {current} out of {goal} tons of carbon offset as of {date}
                </p>
              </div>
            </div>

            {/* CREDITS */}
            <div className="flex flex-col mt-24 pb-24">
              <div className="text-center">
                <h2 className="mt-6 mb-12 text-white text-4xl font-bold">
                  Recent Carbon Credit Retirements
                </h2>
                <div className="container grid grid-cols-4">
                  {stories.map(story => {
                    return <StoryCard key={story.id} story={story} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
