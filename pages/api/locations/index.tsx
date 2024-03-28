import { NextApiRequest, NextApiResponse } from 'next'
import { getLocations } from '@/utils/registry'

export default async function addOrganization(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  try {
    if (method === 'GET') {
      const data = await getLocations() || []
      //console.log('Locations', data?.length)
      return res.json(data)
    } else {
      res.status(405).send(JSON.stringify({error:'Method not allowed'}))
    }
  } catch(ex:any) {
    console.error(ex)
    res.status(500).send(JSON.stringify({error:ex.message}))
  }
}
