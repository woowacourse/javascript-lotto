import { MESSAGES } from "../constants/index.js";
import { SETTINGS } from "../constants/index.js";

export const outputPrint = (message) => {
  console.log(message);
};

export const lottoResult = () => {
  outputPrint(MESSAGES.output.result);
  outputPrint(MESSAGES.output.divider);
};

export const printLottoTickets = (lottoTickets) => {
  outputPrint(`${lottoTickets.length}개를 구매했습니다.`);
  lottoTickets.forEach((ticket) => {
    outputPrint(`[${ticket.join(", ")}]`);
  });
};

export const printRankResult = (count, description) => {
  outputPrint(`${description} - ${count}개`);
};

export const printMatchResults = (results) => {
  lottoResult();

  printRankResult(
    results.rankCounts.fifth,
    `${SETTINGS.rewards.fifth.matchCount}개 일치 (${SETTINGS.rewards.fifth.amount.toLocaleString()}원)`
  );
  printRankResult(
    results.rankCounts.fourth,
    `${SETTINGS.rewards.fourth.matchCount}개 일치 (${SETTINGS.rewards.fourth.amount.toLocaleString()}원)`
  );
  printRankResult(
    results.rankCounts.third,
    `${SETTINGS.rewards.third.matchCount}개 일치 (${SETTINGS.rewards.third.amount.toLocaleString()}원)`
  );
  printRankResult(
    results.rankCounts.second,
    `${SETTINGS.rewards.second.matchCount}개 일치, 보너스 볼 일치 (${SETTINGS.rewards.second.amount.toLocaleString()}원)`
  );
  printRankResult(
    results.rankCounts.first,
    `${SETTINGS.rewards.first.matchCount}개 일치 (${SETTINGS.rewards.first.amount.toLocaleString()}원)`
  );

  outputPrint(`총 수익률은 ${results.profitRate}%입니다.`);
};
