const processDecimalPoint = (rate) => {
  if (rate % 1 === 0) {
    return rate;
  } else if ((rate * 10) % 1 === 0) {
    return rate.toFixed(1);
  }
  return rate.toFixed(2);
};

export default processDecimalPoint;
