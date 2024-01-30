import { NextApiRequest, NextApiResponse } from 'next'

export default async function ping(req:NextApiRequest, res:NextApiResponse){
  res.status(200).json({ success: true });
}
