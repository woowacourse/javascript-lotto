import {
  LOTTO_PRICE,
  REWARD_SAME_THREE,
  REWARD_SAME_FOUR,
  REWARD_SAME_FIVE,
  REWARD_SAME_FIVE_BOUNS,
  REWARD_SAME_SIX,
} from '../constants/constant.js';

export const getWinningCount = (lottoList, winningNumberList) => {
  const bonusNumber = winningNumberList[winningNumberList.length - 1];
  const winningCount = {
    sameThree: 0,
    sameFour: 0,
    sameFive: 0,
    sameFiveAndBonus: 0,
    sameSix: 0,
  };
  winningNumberList.pop();
  
  lottoList.reduce((acc, curr) => {
    const sameList = curr.filter(num =>
      winningNumberList.includes(num),
    );
    switch (sameList.length) {
      case 3:
        acc.sameThree += 1;
        break;
      case 4:
        acc.sameFour += 1;
      case 6:
        acc.sameSix += 1;
        break;
      case 5:
        if (sameList.includes(bonusNumber)) {
          acc.sameFiveAndBonus += 1;
          break;
        }
        acc.sameFive += 1;
        break;
    }

  return acc
  }, {
    sameThree: 0,
    sameFour: 0,
    sameFive: 0,
    sameFiveAndBonus: 0,
    sameSix: 0,
  })

  return winningCount;
};

export const getEarningRate = (lottoCount, outputMoney) => {
  const inputMoney = lottoCount * LOTTO_PRICE;
  const earningRate = Math.floor(outputMoney / inputMoney);
  return earningRate;
};

export const getOutputMoney = winningCount => {
  let outputMoney = 0;
  outputMoney += winningCount.sameThree * REWARD_SAME_THREE;
  outputMoney += winningCount.sameFour * REWARD_SAME_FOUR;
  outputMoney += winningCount.sameFive * REWARD_SAME_FIVE;
  outputMoney += winningCount.sameFiveAndBonus * REWARD_SAME_FIVE_BOUNS;
  outputMoney += winningCount.sameSix * REWARD_SAME_SIX;
  return outputMoney;
};
