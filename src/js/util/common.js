import { REWARD, RULES } from '../constants/index.js';

const convertToNumber = value => Number(value);

// min~max 중 랜덤으로 하나의 정수 값을 반환
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pickLottoNumber = n => {
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

const findRank = (win, bonus) => {
  switch (win) {
    case RULES.LOTTO_NUMS:
      return 1;
    case RULES.LOTTO_NUMS - 1:
      if (bonus === RULES.BONUS_NUMS) {
        return 2;
      }
      return 3;
    case RULES.LOTTO_NUMS - 2:
      return 4;
    case RULES.LOTTO_NUMS - 3:
      return 5;
  }

  return 0;
};

const countCorrectNumber = (lottoList, winningNumbers) => {
  const correctCount = winningNumbers.reduce((count, number) => {
    if (lottoList.includes(number)) {
      count++;
    }
    return count;
  }, 0);

  return correctCount;
};

const getRanks = (lottos, winningNumbers) => {
  const winNumbers = winningNumbers.slice(0, RULES.LOTTO_NUMS);
  const bonusNumbers = winningNumbers.slice(RULES.LOTTO_NUMS);

  const results = lottos.reduce((ranks, lotto) => {
    const lottoList = lotto.getList();
    const correctWinNumCount = countCorrectNumber(lottoList, winNumbers);
    const correctBonusNumCount = countCorrectNumber(lottoList, bonusNumbers);
    const rank = findRank(correctWinNumCount, correctBonusNumCount);

    if (rank !== 0) {
      ranks.push(rank);
    }

    return ranks;
  }, []);

  return results;
};

const calculateTotalReward = results => {
  const totalReward = results.reduce((sumOfReward, result) => {
    switch (result) {
      case 1:
        sumOfReward += REWARD.FIRST;
        break;
      case 2:
        sumOfReward += REWARD.SECOND;
        break;
      case 3:
        sumOfReward += REWARD.THIRD;
        break;
      case 4:
        sumOfReward += REWARD.FOURTH;
        break;
      case 5:
        sumOfReward += REWARD.FIFTH;
    }
    return sumOfReward;
  }, 0);

  return totalReward;
};

export { convertToNumber, pickLottoNumber, getRanks, calculateTotalReward };
