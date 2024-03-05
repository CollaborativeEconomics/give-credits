"use client"
import { useState } from "react"

type Donation = {
  id: string;
  created: Date;
  organization: string;
  initiative: string;
  amount: string;
}

type Dictionary = { [key: string]: any }

export default function TableDonations(props:any){
  const donations:[Dictionary] = props?.donations || []
  const recs = donations.map(rec => { 
    return {
      id: rec.id,
      created: rec.created,
      organization: rec.organization.name,
      initiative: rec.initiative.title,
      amount: rec.amount
    }
  })

  const [data, setData] = useState(recs)

  function toLocal(sdate:string){ return new Date(sdate).toLocaleString() }

  return (
    <table id="table-donations" className="w-full border-collapse">
      <thead className="text-left">
        <tr><th>Date</th><th>Initiative</th><th>Amount</th></tr>
      </thead>
      <tbody>
        { recs.length>0 ? recs.map((row) => {
          return (
            <tr key={row.id} className="border-y border-y-green-900 align-top">
              <td>{toLocal(row.created).substr(0,10)}</td>
              <td>{row.initiative}<br/>
                  <small className="text-gray-400">{row.organization}</small></td>
              <td>{row.amount} XLM</td>
            </tr>
          )
        }) : (
          <tr>
            <td className="col-span-3">No donations found</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
