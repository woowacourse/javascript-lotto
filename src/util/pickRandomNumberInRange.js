function pickRandomNumberInRange(minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
}

export default pickRandomNumberInRange;
