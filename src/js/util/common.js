import { RULES } from '../constants/index.js';

const getWinLottoCount = (props) => {
  const { purchasedLottos, winNumbers, bonusNumber } = props;
  const winLottoCount = {
    fifth: { count: 0, money: 5000 },
    fourth: { count: 0, money: 50000 },
    third: { count: 0, money: 1500000 },
    second: { count: 0, money: 30000000 },
    first: { count: 0, money: 2000000000 },
  };

  purchasedLottos.forEach((lotto) => {
    const temp = new Set(lotto.concat(winNumbers));
    const { size } = temp;

    const winNumberCount = 12 - size;

    switch (winNumberCount) {
      case 3:
        winLottoCount.fifth.count += 1;
        break;
      case 4:
        winLottoCount.fourth.count += 1;
        break;
      case 5:
        if (temp.has(bonusNumber)) {
          winLottoCount.second.count += 1;
          break;
        }
        winLottoCount.third.count += 1;
        break;
      case 6:
        winLottoCount.first.count += 1;
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
