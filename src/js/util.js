export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min + 1)
}

export const getQuotient = (dividend, divisor) => {
  return parseInt(dividend / divisor, 10)
}

export const sortByNumber = (array) => {
  return array.slice().sort((a, b) => a - b)
}

export const $ = (selector) => {
  return document.querySelector(selector)
}

export const $$ = (selector) => {
  return document.querySelectorAll(selector)
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getProfitRate = (currentPrice, previousPrice) => {
  return (currentPrice / previousPrice - 1) * 100
}
