import { $$ } from "../util.js"

export const getManualInput = () => {
  const numbers = [...$$(".manual-number")].map(({ value }) => {
    return Number(value)
  })

  return numbers
}
