import { NextApiRequest, NextApiResponse } from 'next'
import { getCategoriesDistinct } from '@/utils/registry'

export default async function addOrganization(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  //console.log('REQ',req.url)
  try {
    if (method === 'GET') {
      const url = req?.url || ''
      const split  = url.split('?')
      const query = split.length > 1 ? '?'+split[1] : ''
      const params = new URLSearchParams(query)
      const q = params.get('distinct') || 'all'
      //console.log('PARAMS',params)
      //const url = new URL(req?.url)
      //console.log('URL',url)
      //const q = url.searchParams.get('distinct') || 'all'
      //const q = 'all'
      const data = await getCategoriesDistinct(q)
      //console.log('Categories', data?.length)
      return res.json(data)
    } else {
      res.status(405).send(JSON.stringify({error:'Method not allowed'}))
    }
  } catch(ex:any) {
    console.error(ex)
    res.status(500).send(JSON.stringify({error:ex.message}))
  }
}
