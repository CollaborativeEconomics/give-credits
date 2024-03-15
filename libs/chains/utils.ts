import Chains from '@/libs/chains/client/apis'

export type Dictionary = { [key:string]:any }

export function getChainName(currency:string){
  const chains:Dictionary = {
    'arb':   'Arbitrum',
    'avax':  'Avalanche',
    'base':  'Base',
    'bnb':   'Binance',
    'celo':  'Celo',
    'eos':   'EOS',
    'eth':   'Ethereum',
    'fil':   'Filecoin',
    'flr':   'Flare',
    'matic': 'Polygon',
    'op':    'Optimism',
    'usdc':  'EthereumUSDC',
    'usdt':  'EthereumUSDT',
    'xdc':   'XDC',
    'xlm':   'Stellar',
    'xrp':   'XRPL'
  }
  const name = chains[currency] || 'None'
  return name
}

export function getChainWallet(currency:string){
  const wallets:Dictionary = {
    'arb':   'Metamask',
    'avax':  'Metamask',
    'base':  'Coinbase',
    'bnb':   'Metamask',
    'celo':  'Metamask',
    'eos':   'Metamask',
    'eth':   'Metamask',
    'fil':   'Metamask',
    'flr':   'Metamask',
    'matic': 'Metamask',
    'op':    'Metamask',
    'pgn':   'Metamask',
    'usdc':  'Metamask',
    'usdt':  'Metamask',
    'xdc':   'Metamask',
    'xlm':   'Freighter',
    'xrp':   'Xaman'
  }
  const name = wallets[currency] || 'None'
  return name
}

export function getChainNetwork(chain:string){
  const networks:Dictionary = {
    'Arbitrum':     process.env.NEXT_PUBLIC_ARBITRUM_NETWORK,
    'Avalanche':    process.env.NEXT_PUBLIC_AVALANCHE_NETWORK,
    'Base':         process.env.NEXT_PUBLIC_BASE_NETWORK,
    'Binance':      process.env.NEXT_PUBLIC_BINANCE_NETWORK,
    'Celo':         process.env.NEXT_PUBLIC_CELO_NETWORK,
    'EOS':          process.env.NEXT_PUBLIC_EOS_NETWORK,
    'Ethereum':     process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
    'EthereumUSDC': process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
    'EthereumUSDT': process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
    'Filecoin':     process.env.NEXT_PUBLIC_FILECOIN_NETWORK,
    'Flare':        process.env.NEXT_PUBLIC_FLARE_NETWORK,
    'Optimism':     process.env.NEXT_PUBLIC_OPTIMISM_NETWORK,
    'Polygon':      process.env.NEXT_PUBLIC_POLYGON_NETWORK,
    'Stellar':      process.env.NEXT_PUBLIC_STELLAR_NETWORK,
    'XDC':          process.env.NEXT_PUBLIC_XDC_NETWORK,
    'XRPL':         process.env.NEXT_PUBLIC_XRPL_NETWORK
  }
  const name = networks[chain] || 'testnet'
  return name
}

const wallets: Dictionary = {
  coinbase:  { value: 'Coinbase',  image: '/wallets/coinbase.png',  enabled: true },
  freighter: { value: 'Freighter', image: '/wallets/freighter.png', enabled: true },
  lobstr:    { value: 'Lobstr',    image: '/wallets/lobstr.png',    enabled: false },
  metamask:  { value: 'Metamask',  image: '/wallets/metamask.png',  enabled: true },
  xaman:     { value: 'Xaman',     image: '/wallets/xaman.png',     enabled: true },
}

const chainWallets: Dictionary = {
  arb:   [wallets['metamask']],
  avax:  [wallets['metamask']],
  base:  [wallets['coinbase']],
  bnb:   [wallets['metamask']],
  celo:  [wallets['metamask']],
  eos:   [wallets['metamask']],
  eth:   [wallets['metamask']],
  fil:   [wallets['metamask']],
  flr:   [wallets['metamask']],
  matic: [wallets['metamask']],
  op:    [wallets['metamask']],
  pgn:   [wallets['metamask']],
  xdc:   [wallets['metamask']],
  xlm:   [wallets['freighter']],
  xrp:   [wallets['xaman']],
}

export function getChainWallets(chain: string) {
  return chainWallets[chain.toLowerCase()] ?? [wallets['metamask']]
}

export function getChainsList(){
  const chains = Object.values(Chains).map((chain) => {
    return {
      value:   chain?.chain,
      symbol:  chain?.symbol  || '???',
      image:   '/coins/' + (chain?.logo || 'none.png'),
      enabled: chain?.enabled || false
    }
  })
  return chains
  //return [
  //  { value: 'Arbitrum', image: 'arbitrum.png', symbol: 'ARB' },
  //  { value: 'Avalanche', image: 'avax.png', symbol: 'AVAX' },
  //  { value: 'Base', image: 'base.png', symbol: 'BASE' },
  //  { value: 'Binance', image: 'bnb.png', symbol: 'BNB' },
  //  { value: 'Celo', image: 'celo.png', symbol: 'CELO' },
  //  { value: 'EOS', image: 'eos.png', symbol: 'EOS' },
  //  { value: 'Ethereum', image: 'eth.png', symbol: 'ETH' },
  //  { value: 'EthereumUSDC', image: 'usdc.png', symbol: 'USDC' },
  //  { value: 'EthereumUSDT', image: 'usdt.png', symbol: 'USDT' },
  //  { value: 'Filecoin', image: 'fil.png', symbol: 'FIL' },
  //  { value: 'Flare', image: 'flr.png', symbol: 'FLR' },
  //  { value: 'Optimism', image: 'op.png', symbol: 'OP' },
  //  { value: 'Polygon', image: 'matic.png', symbol: 'MATIC' },
  //  { value: 'Stellar', image: 'xlm.png', symbol: 'XLM' },
  //  { value: 'XDC', image: 'xdc.png', symbol: 'XDC' },
  //  { value: 'XRPL', image: 'xrp.png', symbol: 'XRP' }
  //]
}

export function getChainsMap(){
  let chains:Dictionary = {}
  Object.values(Chains).map((chain) => {
    chains[chain.chain] = {
      symbol:  chain?.symbol  || '???',
      image:   '/coins/' + (chain?.logo || 'none.png'),
      enabled: chain?.enabled || false
    }
  })
  return chains
  
  //return {
  //  Arbitrum: { image: 'arbitrum.png', symbol: 'ARB' },
  //  Avalanche: { image: 'avax.png', symbol: 'AVAX' },
  //  Base: { image: 'base.png', symbol: 'BASE' },
  //  Binance: { image: 'bnb.png', symbol: 'BNB' },
  //  Celo: { image: 'celo.png', symbol: 'CELO' },
  //  EOS: { image: 'eos.png', symbol: 'EOS' },
  //  Ethereum: { image: 'eth.png', symbol: 'ETH' },
  //  EthereumUSDC: { image: 'usdc.png', symbol: 'USDC' },
  //  EthereumUSDT: { image: 'usdt.png', symbol: 'USDT' },
  //  Filecoin: { image: 'fil.png', symbol: 'FIL' },
  //  Flare: { image: 'flr.png', symbol: 'FLR' },
  //  Optimism: { image: 'op.png', symbol: 'OP' },
  //  Polygon: { image: 'matic.png', symbol: 'MATIC' },
  //  Stellar: { image: 'xlm.png', symbol: 'XLM' },
  //  XDC: { image: 'xdc.png', symbol: 'XDC' },
  //  XRPL: { image: 'xrp.png', symbol: 'XRP' }
  //}

}
