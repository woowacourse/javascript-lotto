export const getRandomNumber = (min, max) => {
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
