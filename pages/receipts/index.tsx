import Link from 'next/link'
import Page from 'components/page'
import Card from 'components/card'
import Divider from 'components/divider'
import TextRow from 'components/textrow'
import BackButton from 'components/backbutton'
import { getNFTsByWallet } from 'utils/registry'
import { getCookie } from 'cookies-next'
//import Session from 'utils/session'

export async function getServerSideProps({ req, res, query }:any){
  let wallet = query.wallet || ''
  if (!wallet) {
    wallet = getCookie('wallet', { req, res }) ?? null; // check cookies just in case
  }
  console.log('Wallet:', wallet)
  //const session = Session(req)
  const NFTs = await getNFTsByWallet(wallet) || [];
  NFTs.sort((n1:any, n2:any) => (n1.created < n2.created ? 1 : -1));
  //console.log('Session:', session)
  return { props: {wallet, NFTs} }
}

export default function Receipts(props:any) {
  const { wallet, NFTs } = props

  if (!wallet) {
    return (
      <Page>
        <BackButton />
        <div className="flex flex-col items-center w-full">
          <p>Wallet not connected</p>
        </div>
      </Page>
    );
  }

  if (!NFTs.length) {
    return (
      <Page>
        <BackButton />
        <div className="flex flex-col items-center w-full">
          <p>No Receitps found</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <BackButton />
      <h1 className="text-center text-4xl mb-6">Your Receipts</h1>
      {NFTs.map((item:any) => {
        const impactUrl = item.initiative?.id ? '/impact/'+item.initiative?.id : null
        return (
          <Card key={item.tokenId} onClick={() => null}>
            <>
              <div className="text-green-300 text-base p-6 text-right w-full">
                {new Date(item.created).toLocaleString()}
              </div>
              <Divider />
              <div className="flex flex-col w-full items-start">
                <TextRow
                  label={'Organization'}
                  text={item.organization.name}
                  className="px-6 py-3"
                />
                <TextRow
                  label={'Initiative'}
                  text={item.initiative?.title || 'A happy donation'}
                  className="px-6 py-0"
                />
                <h3 className="ml-6 mt-0 text-base text-slate-400">{impactUrl ? <Link className="text-slate-400" href={impactUrl}>See the impact storyline &raquo;</Link> : <>No Impact storyline yet</>}</h3>
                <TextRow
                  text={`${item.coinValue} ${item.coinSymbol} • ${item.usdValue} USD`}
                  label={'Donation Value'}
                  className="px-6 py-3 mb-3"
                />
              </div>
            </>
          </Card>
        )
      })}
      <h1 className="text-center text-xl mb-6">You have {NFTs?.length || 0} Receipt{NFTs?.length==1 ? '' : 's'}</h1>
    </Page>
  );
}
