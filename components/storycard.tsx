import Image from 'next/image'

export default function StoryCard(props:any) {
  const story = props?.story
  if(!story){ return (<>Story cards not found</>) }
  const organization = story.organization
  const initiative = story.initiative
  //const media = story.media.map((it:any)=>it.media) // flatten list
  //media.unshift(story.image) // main image to the top

  return (
    <>
      <div className="flex flex-row justify-start mb-8">

        <div className="relative max-w-[200px] w-full h-auto aspect-[8/5]">
          <Image className="rounded" src={story.image} alt="Story image" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="flex flex-col ml-4 justify-start">

          <div className="flex flex-row">
            <Image className="rounded" src={organization?.image} width={48} height={48} alt="org avatar" />
            <div className="ml-2">
              <h1>{organization?.name}</h1>
              <p className="text-sm truncate">
                in <span className="underline"><a href={'/initiatives/'+initiative?.id}>{initiative?.title}</a></span>
              </p>
            </div>
          </div>

          <div><span className="text-sm text-slate-400">{new Date(story.created).toLocaleString()}</span></div>

          <div className="text-sm line-clamp-2">
            {story.description}
          </div>

        </div>
      </div>
    </>
  )
}