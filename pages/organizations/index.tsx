import { Card } from '@/components/ui/card'
import SearchBar from '@/components/search/SearchBar'
import OrganizationCard from '@/components/OrganizationCard'
import { searchOrganizations } from '@/utils/registry'

export async function getServerSideProps(props:any) {
  const query    = props?.query.query || ''
  const category = props?.query?.category || ''
  const location = props?.query?.location || ''
  console.log('SEARCH', query, category, location)
  const data = (await searchOrganizations(query, category, location)) || []
  const organizations = data.filter((it:any)=>!it.inactive)
  console.log('ORGS', organizations.length)
  return { props: { organizations } }
}

export default function Organizations(props: any) {
  const organizations = props.organizations
  return (
    <main className="flex min-h-screen flex-col items-stretch container mt-12 pt-24">
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        { organizations?.length>0 ? organizations.map((organization:any) => {
          return (
            <OrganizationCard key={organization.id} data={organization} />
          )
        }) : (
          <h1 className="m-4">No organizations found</h1>
        )}
      </div>
    </main>
  )
}
