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
  
  for (let i = 0; i < lottoList.length; i++) {
    const sameList = lottoList[i].filter(num =>
      winningNumberList.includes(num),
    );
    switch (sameList.length) {
      case 3:
        winningCount.sameThree += 1;
        break;
      case 4:
        winningCount.sameFour += 1;
      case 6:
        winningCount.sameSix += 1;
        break;
      case 5:
        if (sameList.includes(bonusNumber)) {
          winningCount.sameFiveAndBonus += 1;
          break;
        }
        winningCount.sameFive += 1;
        break;
    }
  }
  return winningCount;
};

export const getEarningRate = (lottoCount, outputMoney) => {
  const inputMoney = lottoCount * LOTTO_PRICE;
  const earningRate = parseInt(outputMoney / inputMoney);
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
