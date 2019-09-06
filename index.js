// only displays if web3
// <script type="text/javascript" src="http://assets.doorkeeper.jp/assets/widget.js"></script>
// <a class="doorkeeper-registration-widget" href="http://apicommunity.doorkeeper.jp/events/773">Register for Javascript Widget Demo</a>
// script file and the element itself

// user adds two script tags with two things in it - one is pulling this down and running it, other is variables for address and id to target

const addr = '0x8d3e809Fbd258083a5Ba004a527159Da535c8abA'
const domElementId = 'button-goes-here'

document.addEventListener("DOMContentLoaded", main)

async function main() {
  if (webThreeEnabled()) {
    // load the widget - get the element and add the contents
    // watch for a click
    addButtonToDOM()

  }
}

let addButtonToDOM = () => {
  let el = document.getElementById(domElementId)
  let button = document.createElement('div')
  button.id = 'buy-me-a-burretho'
  button.innerHTML = `<img src="" /><p>Buy me a burretho</p>`
  el.insertBefore(button, el.firstChild)
  addStyles()
}

let addStyles = () => {
  let style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule(`@font-face { font-family: 'pacificoregular'; src: url('pacifico-regular-webfont.woff2') format('woff2'), url('pacifico-regular-webfont.woff') format('woff'); font-weight: normal; font-style: normal; }`)
  style.sheet.insertRule(`#buy-me-a-burretho { color: darkseagreen; font-family: 'pacificoregular'; }`)

}

let webThreeEnabled = () => {
  if (web3) { return true }
  return false
}

async function usdToEth(usd) {
  let res = await window.fetch(`https://api.coinmarketcap.com/v1/ticker/ethereum/`)
  let json = await res.json()
  let priceUsd = json[0].price_usd
  return usd/priceUsd
}

async function signTxn(toAddr, amount) {
  const transactionParameters = {
    nonce: '0x00', // ignored by MetaMask
    to: toAddr, // Required except during contract publications.
    from: web3.eth.accounts[0], // must match user's active address.
    value: amount // Only required to send ether to the recipient from the initiating external account.
  }

  let res = await ethereum.sendAsync({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
    from: ethereum.selectedAddress,
  })

  let json = await res.json()
  console.log(json);
}
