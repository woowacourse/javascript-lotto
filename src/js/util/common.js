import { RULES } from '../constants/index.js';

const getWinLottoCount = (props) => {
  const { purchasedLottos, winNumbers, bonusNumber } = props;
  const winLottoCount = {
    three: { count: 0, money: 5000 },
    four: { count: 0, money: 50000 },
    five: { count: 0, money: 1500000 },
    fiveBonus: { count: 0, money: 30000000 },
    six: { count: 0, money: 2000000000 },
  };

  purchasedLottos.forEach((lotto) => {
    const temp = new Set(lotto.concat(winNumbers));
    const { size } = temp;

    const winNumberCount = 12 - size;

    switch (winNumberCount) {
      case 3:
        winLottoCount.three.count += 1;
        break;
      case 4:
        winLottoCount.four.count += 1;
        break;
      case 5:
        if (temp.has(bonusNumber)) {
          winLottoCount.fiveBonus.count += 1;
          break;
        }
        winLottoCount.five.count += 1;
        break;
      case 6:
        winLottoCount.six.count += 1;
        break;
      default:
        break;
    }
  });

  return winLottoCount;
};

const convertToNumber = (value) => Number(value);

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickLottoNumber = (n) => {
  const lottos = new Set();

  while (lottos.size < n) {
    const number = getRandomNumber(
      RULES.MIN_LOTTO_NUMBER,
      RULES.MAX_LOTTO_NUMBER,
    );

    lottos.add(number);
  }

  return [...lottos];
};

export { convertToNumber, pickLottoNumber, getWinLottoCount };
