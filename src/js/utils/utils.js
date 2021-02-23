import { LOTTO_NUMBERS } from './constants.js';

export function getRandomNumber() {
  return Math.floor(Math.random() * LOTTO_NUMBERS.LOTTO_MAX_NUM) + 1;
}

export function compareNumbers(lottos, winningNumbers) {
  checkMatchingNums(lottos, winningNumbers);
  checkBonus(lottos, winningNumbers);
}

function checkMatchingNums(lottos, winningNumbers) {
  let i = 0;
  while (i++ < 6) {
    const currNum = winningNumbers[i];
    lottos.forEach(lotto => {
      if (lotto.numbers.has(currNum)) {
        lotto.addMatchNumbers();
      }
    });
  }
}

function checkBonus(lottos, winningNumbers) {
  const bonusNumber = winningNumbers[7];

  lottos.forEach(lotto => {
    if (lotto.numbers.has(bonusNumber)) {
      lotto.setMatchBonus();
    }
  });
}
