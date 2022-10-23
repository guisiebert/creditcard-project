import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img ")
console.log(ccLogo.src)

function setCardType(type) {
  const colors = {
    visa: ["#2D65F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "grey"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

// Security code MASK!
const securityCode = document.querySelector("#security-code")
const securityCodePattern = { mask: "0000" }
const SecurityCodeMasked = IMask(securityCode, securityCodePattern)

// Expiration Date
const expDate = document.querySelector("#expiration-date")
const expDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expDateMasked = IMask(expDate, expDatePattern)

// Card Number
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("ok, parabéns")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "Fulando da Silvassauro" : cardHolder.value
})

securityCode.addEventListener("input", () => {
  const cardCVCDisplay = document.querySelector(".cc-security .value")
  cardCVCDisplay.innerText =
    securityCode.value.length === 0 ? "123" : securityCode.value
})

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const cardNumberDisplay = document.querySelector(".cc-number")
  cardNumberDisplay.innerText =
    number.length === 0 ? "1234 5678 9012 3456" : number
}

expDateMasked.on("accept", () => {
  const cardExpDisplay = document.querySelector(".cc-expiration .value")
  cardExpDisplay.innerText =
    expDate.value.length === 0 ? "02/32" : expDate.value
})
