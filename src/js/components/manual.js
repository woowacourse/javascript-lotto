import { $$ } from "../util.js"

export const getManualInput = () => {
  const numbers = [...$$(".manual-number")].map(({ value }) => {
    return value === "" ? NaN : Number(value)
  })

  return numbers
}
