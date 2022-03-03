import { LOTTO_PRICE } from '../constants/constant.js';

export const setResultModal = (lottoList, lastWinningNumberList) => {
  const winningCount = getWinningCount(lottoList, lastWinningNumberList);
  const earningRate = getEarningRate(
    lottoList.length,
    getOutputMoney(winningCount),
  );

  return [winningCount, earningRate];
};

const getWinningCount = (lottoList, lastWinningNumberList) => {
  const bonusNumber = lastWinningNumberList[lastWinningNumberList.length - 1];
  const winningCount = {
    sameThree: 0,
    sameFour: 0,
    sameFive: 0,
    sameFiveAndBonus: 0,
    sameSix: 0,
  };
  lastWinningNumberList.pop();

  for (let i = 0; i < lottoList.length; i++) {
    const sameList = lottoList[i].filter(num =>
      lastWinningNumberList.includes(num),
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

const getEarningRate = (lottoCount, outputMoney) => {
  const inputMoney = lottoCount * LOTTO_PRICE;
  const earningRate = parseInt(outputMoney / inputMoney);
  return earningRate;
};

const getOutputMoney = winningCount => {
  let outputMoney = 0;
  outputMoney += winningCount.sameThree * 5000;
  outputMoney += winningCount.sameFour * 50000;
  outputMoney += winningCount.sameFive * 1500000;
  outputMoney += winningCount.sameFiveAndBonus * 30000000;
  outputMoney += winningCount.sameSix * 2000000000;
  return outputMoney;
};
