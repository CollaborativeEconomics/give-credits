import Page from 'components/page'
import Title from 'components/title'
import Event from 'components/event'
import styles from 'styles/common.module.css'
import { getStoriesByInitiative } from 'utils/registry'


export default async function Impact(props:any) {
  const initid = props.params?.id?.toString() || ''
  console.log('InitID', initid)
  const stories = await getStoriesByInitiative(initid) || []
  //console.log('STORIES', stories)
  if(stories?.length>0){ stories.sort((a:any, b:any) => (a.created < b.created ? 1 : -1)) } // Sort by date desc

  return (
    <Page>
      <div className={styles.content}>
        <Title text="Impact Storyline" />
        <p className={styles.intro}>
          Your donations are helping people and communities around the world.
          Here is a storyline of recent events made possible with your help.
          Together we keep building a better world!
        </p>
        { stories?.length>0 ? stories.map((item:any) => (
          <div className={styles.mainBox + " my-4"} key={item.id}>
            <Event key={item.id} {...item} />
          </div>
        )) : (
          <h1 className="text-center text-2xl my-24">No stories found</h1>
        )}
      </div>
    </Page>
  )
}
