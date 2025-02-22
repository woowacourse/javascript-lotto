import FrozenMap from "../FrozenMap.js";

export const LOTTO_RULE = Object.freeze({
  MULTIPLE_PRICE: 1_000,
  MIN_PRICE: 1_000,
  MAX_PRICE: 100_000,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_LENGTH: 6,
});

export const LOTTO_MATCHED_NUMBER_COUNT = new FrozenMap([
  [3, "3개 일치"],
  [4, "4개 일치"],
  [5, "5개 일치"],
  ["5B", "5개 일치+보너스"],
  [6, "6개 일치"]
])

export const LOTTO_PRIZE_MONEY = new FrozenMap([
  ["3개 일치", 5_000],
  ["4개 일치", 50_000],
  ["5개 일치", 1_500_000],
  ["5개 일치+보너스", 30_000_000],
  ["6개 일치", 2_000_000_000],
]);

export const LOTTO_RESULT_MESSAGES_MAP = Array.from(LOTTO_MATCHED_NUMBER_COUNT).reduce(
  (messages, [matchedCount, matchKey]) => {
    const prizeMoney = LOTTO_PRIZE_MONEY.get(matchKey).toLocaleString();
    if (matchKey === "5개 일치+보너스") {
      messages.set(matchedCount, `5개 일치, 보너스 볼 일치 (${prizeMoney}원) - `);
      return messages;
    }

    messages.set(matchedCount, `${matchedCount}개 일치 (${prizeMoney}원) - `);
    return messages;
  },
  new FrozenMap()
);

export const LOTTO_RESTART_COMMAND = Object.freeze({
  restart: "y",
  end: "n",
});
