import LOTTO_RULE from '../constants/rules/lottoRule';

export function calculateROI(money, totalLottoRanks) {
  const moneyAmount = money.amount;
  const totalProfit = totalLottoRanks.reduce((profit, rankCount, idx) => {
    return (profit += rankCount[1] * LOTTO_RULE.PRIZE[idx]);
  }, 0);

  const profitRate = 100 + ((totalProfit - moneyAmount) / moneyAmount) * 100;

  return parseFloat(profitRate.toFixed(1));
}

export function calculateLottoRanks(lottos, winningNumbers) {
  const lottoRanks = initRanks();

  lottos.forEach(lotto => {
    const lottoValues = lotto.lottoNumbers;
    const winningLottoValues = winningNumbers.get('winningLotto').lottoNumbers;
    const bonusNumber = winningNumbers.get('bonusNumber').value;
    const isBonus = lottoValues.includes(bonusNumber);

    const mergeLottoAndWinningLotto = [...lottoValues, ...winningLottoValues];
    const matchCount = mergeLottoAndWinningLotto.length - new Set(mergeLottoAndWinningLotto).size;

    checkWinningLotto(lottoRanks, matchCount, isBonus);
  });

  const totalLottoRanks = Array.from(lottoRanks);

  return totalLottoRanks;
}

function initRanks() {
  const lottoRanks = new Map();
  const rankValues = Object.values(LOTTO_RULE.RANKS).map(rankName => rankName.RANK);

  rankValues.forEach(rank => {
    lottoRanks.set(rank, 0);
  });

  return lottoRanks;
}

function checkWinningLotto(lottoRanks, matchCount, isBonus) {
  if (matchCount === LOTTO_RULE.RANKS.FIRST.MATCH_COUNT) {
    increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.FIRST.RANK);
  } else if (matchCount === LOTTO_RULE.RANKS.SECOND.MATCH_COUNT && isBonus) {
    increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.SECOND.RANK);
  } else if (matchCount === LOTTO_RULE.RANKS.THIRD.MATCH_COUNT) {
    increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.THIRD.RANK);
  } else if (matchCount === LOTTO_RULE.RANKS.FOURTH.MATCH_COUNT) {
    increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.FOURTH.RANK);
  } else if (matchCount === LOTTO_RULE.RANKS.FIFTH.MATCH_COUNT) {
    increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.FIFTH.RANK);
  }
}

function increaseRankCount(lottoRanks, rankName) {
  const lottoRanksValue = lottoRanks.get(rankName);
  lottoRanks.set(rankName, lottoRanksValue + 1);
}
