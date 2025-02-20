import updateMatchResult from "./updateMatchResult.js";
import checkRank from "./checkRank.js";

/**
 * 로또 번호 목록을 받아 각 로또가 당첨 번호와 얼마나 일치하는지 확인하고,
 * 당첨 개수 및 총 당첨 금액을 계산하여 반환합니다.
 *
 * @param {Lotto[]} lottos - 사용자가 구매한 로또 객체 배열
 * @param {Object} result - 당첨 결과 정보
 * @param {number[]} result.winningNumbers - 당첨 번호 배열 (6개)
 * @param {number} result.bonusNumber - 보너스 번호 (1개)
 * @returns {{ totalReward: number, resultCount: number[] }} - 총 당첨 금액과 당첨 등수별 개수
 */
const checkWinningResults = (lottos, result) => {
  const { winningNumbers, bonusNumber } = result;

  lottos.forEach((lotto) =>
    updateMatchResult(lotto, winningNumbers, bonusNumber),
  );

  return lottos
    .map((lotto) =>
      checkRank(lotto.matchResult.matchCount, lotto.matchResult.isBonusMatched),
    )
    .filter(Boolean)
    .reduce(
      (acc, result) => ({
        totalReward: acc.totalReward + result.REWARD,
        resultCount: acc.resultCount.map((count, index) =>
          index === result.RANK ? count + 1 : count,
        ),
      }),
      { totalReward: 0, resultCount: new Array(6).fill(0) },
    );
};

export default checkWinningResults;
