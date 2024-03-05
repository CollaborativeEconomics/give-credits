import { NextApiRequest, NextApiResponse } from 'next'
import { getUserByWallet } from 'utils/registry'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  console.log('Query', query)
  const wallet = (query?.wallet || '').toString()

  try {
    if (method === 'GET') {
      const result = await getUserByWallet(wallet)
      console.log('RESULT', result)
      res.status(200).send(JSON.stringify(result))
    } else {
      res.status(405).send(JSON.stringify({error:'Method not allowed'}))
    }
  } catch(ex:any) {
    console.error(ex)
    res.status(500).send(JSON.stringify({error:ex.message}))
  }
}
