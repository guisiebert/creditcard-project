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
IMask(securityCode, securityCodePattern)

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
