const isPositiveInteger = (payment) => {
  if (!Number.isInteger(payment) || payment <= 0) {
    throw new Error('');
  }

  return payment;
};

const isDivisibleBy = (payment, price) => {
  if (payment % price !== 0) {
    throw new Error('error');
  }

  return parseInt(payment / price);
};

const createRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const createRandomNumberList = (count) => {
  const randomNumberList = [];

  while (randomNumberList.length < count) {
    const random = createRandomNumber(1, 45);
    if (!randomNumberList.includes(random)) {
      randomNumberList.push(random);
    }
  }

  return randomNumberList;
};

export {
  isPositiveInteger,
  isDivisibleBy,
  createRandomNumber,
  createRandomNumberList,
};
