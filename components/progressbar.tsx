export default function Progress(props){
  const value = props.value || 0
  const style = `rounded text-white text-center bg-blue-700`
  const width = {width:value+'%'}
  //console.log(value)
  //console.log(style)
  return (
    <div className="w-[500px] mx-auto bg-gray-200 rounded">
      <div className={style} style={width}>{value}%</div>
    </div>
  )
}