const isPositiveInteger = (payment) => {
  if (!Number.isInteger(payment) || payment <= 0) {
    throw new Error(
      '구입할 금액은 1000원 이상 10000원 이하를 입력해주셔야 합니다.'
    );
  }

  return payment;
};

const isDivisibleBy = (payment, price) => {
  if (payment % price !== 0) {
    throw new Error('구입할 금액은 1000원 단위로 입력해주셔야 합니다');
  }

  return parseInt(payment / price);
};

const createRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const createRandomNumberList = () => {
  const randomNumberList = [];

  while (randomNumberList.length < 6) {
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
