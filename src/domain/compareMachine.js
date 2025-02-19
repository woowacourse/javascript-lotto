const compareMachine = (lottoPack, answerLottoPack) => {
  const result = { 6: 0, "5+1": 0, 5: 0, 4: 0, 3: 0 };

  lottoPack.lottos.forEach((lotto) => {
    let winningCount = 0;
    let bonusCount = 0;
    lotto.forEach((number) => {
      if (answerLottoPack.answerTable[number] === "당첨 번호") {
        winningCount += 1;
      }
      if (answerLottoPack.answerTable[number] === "보너스 번호") {
        bonusCount += 1;
      }
    });
    if (winningCount === 5 && bonusCount === 1) {
      result["5+1"]++;
    } else {
      result[winningCount]++;
    }
  });
  return result;
};

export default compareMachine;
