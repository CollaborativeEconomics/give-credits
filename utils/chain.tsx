function coinFromChain(chain:string){
  return {
  'Arbitrum':     'arb',
  'Avalanche':    'avax',
  'Base':         'base',
  'Binance':      'bnb',
  'Celo':         'celo',
  'EOS':          'eos',
  'Ethereum':     'eth',
  'EthereumUSDC': 'usdc',
  'EthereumUSDT': 'usdt',
  'Filecoin':     'fil',
  'Flare':        'flr',
  'Optimism':     'op',
  'Polygon':      'matic',
  'Stellar':      'xlm',
  'XRPL':         'xrp',
  'XDC':          'xdc'
  }[chain] || ''
}

function chainFromCoin(coin:string){
  return {
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
  }[coin] || ''
}

export {
  coinFromChain,
  chainFromCoin
}