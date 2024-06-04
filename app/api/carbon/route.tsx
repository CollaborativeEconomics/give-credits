import { updateCredit } from '@/utils/registry'

export async function GET(request: Request) {
  console.log('Getting carbon value')
  let url, res, inf, price
  try {
    url = process.env.STELLAR_CARBON+'/carbon-quote?carbon_amount=1'
    console.log('URL1', url)
    res = await fetch(url)
    inf = await res.json()
    console.log('INF', inf)
    price = inf?.average_price || '0'
    console.log('Carbon value:', price)
    if(price!='0'){
      // save to db
      const creditId = 'f4f96aee-741d-4c63-8af5-49340a10b58c' // get from initiative? pass as parameter?
      const ok = await updateCredit(creditId, {value:price})
      console.log('Saved', ok)
    }
    return Response.json(price)
  } catch(ex) {
    console.error('Error fetching API:', ex)
    return Response.json('0')
  }
}
