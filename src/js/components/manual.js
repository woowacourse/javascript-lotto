import { $, $$ } from "../util.js"

export const getManualInput = () => {
  const numbers = $$(".manual-number").map(({ value }) => {
    Number(value)
  })

  return numbers
}
