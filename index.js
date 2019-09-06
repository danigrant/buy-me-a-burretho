// only displays if web3
// <script type="text/javascript" src="http://assets.doorkeeper.jp/assets/widget.js"></script>
// <a class="doorkeeper-registration-widget" href="http://apicommunity.doorkeeper.jp/events/773">Register for Javascript Widget Demo</a>
// script file and the element itself

// user adds two script tags with two things in it - one is pulling this down and running it, other is variables for address and id to target

// TODO need api that's just eth to wei

const addr = '0x8d3e809Fbd258083a5Ba004a527159Da535c8abA'
const domElementId = 'button-goes-here'


document.addEventListener("DOMContentLoaded", main)

async function main() {
  if (webThreeEnabled()) {
    // load the widget - get the element and add the contents
    // watch for a click
    let button = addButtonToDOM()
    button.addEventListener("click", makePayment)
  }
}

let addButtonToDOM = () => {
  let el = document.getElementById(domElementId)
  let button = document.createElement('div')
  button.id = 'buy-me-a-burretho'
  button.innerHTML = `<div id="buy-me-a-burretho__contents"><img src="burrito.svg" /><p>Buy me a burretho</p></div>`
  el.insertBefore(button, el.firstChild)
  addStyles()
  return button
}

let addStyles = () => {
  let style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule(`@font-face { font-family: 'pacificoregular'; src: url('pacifico-regular-webfont.woff2') format('woff2'), url('pacifico-regular-webfont.woff') format('woff'); font-weight: normal; font-style: normal; }`)
  style.sheet.insertRule(`#buy-me-a-burretho { -webkit-filter: brightness(100%); display: inline-block; color: black; font-family: 'pacificoregular'; font-size: 18px; height: 35px; width: 230px; border-radius: 10px; box-shadow: #dadada 2px 3px 4px 0px; background-color: pink; padding: 5px; }`)
  style.sheet.insertRule(`#buy-me-a-burretho__contents { position: relative; top: -2px; margin: 0 auto; padding-left: 8px; }`)
  style.sheet.insertRule(`#buy-me-a-burretho p { display: inline-block; margin: 0 }`)
  style.sheet.insertRule(`#buy-me-a-burretho img { vertical-align: middle; width: 35px; }`)
  style.sheet.insertRule(`#buy-me-a-burretho:hover { -webkit-filter: brightness(90%); -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; -ms-transition: all 1s ease; transition: all 1s ease; }`)
}

let webThreeEnabled = () => {
  if (web3) { return true }
  return false
}

async function usdToWei(usd) {
  let res = await window.fetch(`https://api.coinmarketcap.com/v1/ticker/ethereum/`)
  let json = await res.json()
  let priceUsd = json[0].price_usd
  let eth = usd / priceUsd
  let wei = eth * 10^18
  console.log(wei);
  return wei
}

async function transact(toAddr, amountWei) {
  let transactionParameters = {
    nonce: '0x00', // ignored by MetaMask
    to: toAddr,
    from: web3.eth.accounts[0],
    value: amountWei
  }

  await ethereum.sendAsync({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
    from: ethereum.selectedAddress,
  })
}

async function makePayment() {
  // get 5 usd in eth
  // let weiAmount = await usdToWei(5)
  let weiAmount = "2000000000000"
  let txn = await transact(addr, weiAmount)

}
