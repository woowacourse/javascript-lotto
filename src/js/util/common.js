const pickLottoNumber = n => {
  const lottos = new Set();

  while (lottos.size < n) {
    const number = getRandomNumber(1, 45);
    lottos.add(number);
  }

  return [...lottos];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
};

export { pickLottoNumber };
