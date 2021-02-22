export const isFloatNumber = value => {
  return parseInt(value, 10) !== value
}

export const isNegativeNumber = value => {
  return value < 0
}

export const isPositiveLessThanThousand = value => {
  return 0 <= value && value < 1000
}
