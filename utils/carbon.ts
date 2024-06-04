export default async function getCarbon(server:boolean=true) {
  console.warn('Getting carbon value')
  let url, res, inf, val
  try {
    if(server){
      url = '/api/carbon'
    } else {
      url = process.env.STELLAR_CARBON+'/carbon-quote?carbon_amount=1'
    }
    console.log('URL2', url)
    res = await fetch(url)
    inf = await res.json()
    console.log('INF', inf)
    val = inf?.average_price || '0'
    console.warn('Carbon value:', val)
    return val
  } catch(ex) {
    console.error('Error fetching API:', ex)
    return '0'
  }
}
