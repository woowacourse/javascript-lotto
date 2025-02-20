import FrozenMap from "../FrozenMap.js";

export const LOTTO_RULE = Object.freeze({
  MULTIPLE_PRICE: 1_000,
  MIN_PRICE: 1_000,
  MAX_PRICE: 100_000,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_LENGTH: 6,
});

export const LOTTO_PRIZE_MONEY = new FrozenMap([
  [3, 5_000],
  [4, 50_000],
  [5, 1_500_000],
  ["5B", 30_000_000],
  [6, 2_000_000_000],
]);

export const LOTTO_RESULT_MESSAGES_MAP = Array.from(LOTTO_PRIZE_MONEY).reduce(
  (messages, [key, value]) => {
    const prizeMoney = value.toLocaleString();
    if (key === "5B") {
      messages.set(key, `5개 일치, 보너스 볼 일치 (${prizeMoney}원) - `);
      return messages;
    }

    messages.set(key, `${key}개 일치 (${prizeMoney}원) - `);
    return messages;
  },
  new FrozenMap()
);
LOTTO_RESULT_MESSAGES_MAP.freeze();

export const LOTTO_RESTART_COMMAND = Object.freeze({
  restart: "y",
  end: "n",
});
