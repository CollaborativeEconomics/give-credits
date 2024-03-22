import timeAgo from '@/utils/timeago'

interface ChartType {
  goal: number
  value: number
  date: Date
}

// https://stackoverflow.com/questions/50960084/how-to-extend-cssproperties-in-react-project
//const style: { [key: string]: React.CSSProperties } = {
const style = {
  label: {
    color: '#000',
    textAlign: 'center',
    marginBottom: '14px'
  },
  value: {
    fontWeight: '400',
    fontSize: '1'
  },
  chart: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridColumnGap: '0px',
    gridRowGap: '0px',
    width: '500px',
    margin: '0 auto'
  },
  ton: {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: '40px',
    height: '40px',
    margin: '2px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f6f6f6'
  },
  off: {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: '40px',
    height: '40px',
    margin: '2px',
    border: '1px solid #00440044',
    borderRadius: '6px',
    backgroundColor: '#00aa00'  // 1a56db blue
  },
  p10: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 10%, #fff 10%, #fff 100%)' },
  p20: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 20%, #fff 20%, #fff 100%)' },
  p30: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 30%, #fff 30%, #fff 100%)' },
  p40: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 40%, #fff 40%, #fff 100%)' },
  p50: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 50%, #fff 50%, #fff 100%)' },
  p60: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 60%, #fff 60%, #fff 100%)' },
  p70: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 70%, #fff 70%, #fff 100%)' },
  p80: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 80%, #fff 80%, #fff 100%)' },
  p90: { background: 'linear-gradient(to right, #00aa00 0%, #00aa00 90%, #fff 90%, #fff 100%)' }
} as const

function MainChart({
  goal,
  value,
  date
}: ChartType) {
  const pct:any = {
    10: { ...style.ton, ...style.p10 },
    20: { ...style.ton, ...style.p20 },
    30: { ...style.ton, ...style.p30 },
    40: { ...style.ton, ...style.p40 },
    50: { ...style.ton, ...style.p50 },
    60: { ...style.ton, ...style.p60 },
    70: { ...style.ton, ...style.p70 },
    80: { ...style.ton, ...style.p80 },
    90: { ...style.ton, ...style.p90 }
  }
  const num = value
  const int = Math.trunc(num)
  const mod = num % 1
  const ext = mod ? 1 : 0
  const fix = mod.toFixed(1)
  const dec = Number(fix) * 100
  const prt:any = pct[dec]
  const rst = 100 - int - ext
  const offs = Array(int).fill(0)
  const tons = Array(rst).fill(0)
  //console.log('Tons', num, int, mod, fix, dec, rst)
  //console.log('Arrs', offs.length, tons.length)
  return (
    <>
      <div style={style.chart}>
        {offs.map(() => { return (<div style={style.off} key={Math.random()}></div>) } )}
        {dec>0 ? (<div style={prt}></div>) : <></> }
        {tons.map(() => { return (<div style={style.ton} key={Math.random()}></div>) } )}
      </div>
    </>
  )
}

export default MainChart
