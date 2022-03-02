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
  if (win === RULES.LOTTO_NUMS) {
    return 1;
  } else if (win === RULES.LOTTO_NUMS - 1 && bonus === RULES.BONUS_NUMS) {
    return 2;
  } else if (win === RULES.LOTTO_NUMS - 1) {
    return 3;
  } else if (win === RULES.LOTTO_NUMS - 2) {
    return 4;
  } else if (win === RULES.LOTTO_NUMS - 3) {
    return 5;
  }

  return 0;
};

const countCorrectNumber = (lottoList, winningNumbers) => {
  let correctCount = 0;

  for (let i = 0; i < winningNumbers.length; i++) {
    if (lottoList.includes(winningNumbers[i])) {
      correctCount++;
    }
  }

  return correctCount;
};

const getRanks = (lottos, winningNumbers) => {
  const results = [];
  const winNumbers = winningNumbers.slice(0, RULES.LOTTO_NUMS);
  const bonusNumbers = winningNumbers.slice(RULES.LOTTO_NUMS);

  lottos.forEach(lotto => {
    const lottoList = lotto.getList();
    const correctWinNumCount = countCorrectNumber(lottoList, winNumbers);
    const correctBonusNumCount = countCorrectNumber(lottoList, bonusNumbers);
    const rank = findRank(correctWinNumCount, correctBonusNumCount);

    if (rank !== 0) {
      results.push(rank);
    }
  });

  return results;
};

const calculateTotalReward = results => {
  let totalReward = 0;

  results.forEach(result => {
    if (result === 1) {
      totalReward += REWARD.FIRST;
    } else if (result === 2) {
      totalReward += REWARD.SECOND;
    } else if (result === 3) {
      totalReward += REWARD.THIRD;
    } else if (result === 4) {
      totalReward += REWARD.FOURTH;
    } else if (result === 5) {
      totalReward += REWARD.FIFTH;
    }
  });

  return totalReward;
};

export { convertToNumber, pickLottoNumber, getRanks, calculateTotalReward };
