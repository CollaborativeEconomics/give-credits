import { NextApiRequest, NextApiResponse } from 'next'

export default async function log(req:NextApiRequest, res:NextApiResponse){
  console.log(req.body)
  res.status(204).end()
}
