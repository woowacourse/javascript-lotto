export const LOTTO_RANK = {
  first: "first",
  second: "second",
  third: "third",
  fourth: "fourth",
  fifth: "fifth",
  none: "none",
};

export const LOTTO_RANK_TO_PRIZE = {
  [LOTTO_RANK.none]: 0,
  [LOTTO_RANK.fifth]: 5_000,
  [LOTTO_RANK.fourth]: 50_000,
  [LOTTO_RANK.third]: 1_500_000,
  [LOTTO_RANK.second]: 30_000_000,
  [LOTTO_RANK.first]: 2_000_000_000,
};

export const LOTTO_RANK_STANDARDS = [
  { rank: LOTTO_RANK.fifth, matchCount: 3, hasBonusNumber: false },
  { rank: LOTTO_RANK.fourth, matchCount: 4, hasBonusNumber: false },
  { rank: LOTTO_RANK.third, matchCount: 5, hasBonusNumber: false },
  { rank: LOTTO_RANK.second, matchCount: 5, hasBonusNumber: true },
  { rank: LOTTO_RANK.first, matchCount: 6, hasBonusNumber: false },
];

const INITIAL_COUNT = 0;
export const LOTTO_RANK_INITIAL_RESULT = Object.freeze({
  [LOTTO_RANK.fifth]: INITIAL_COUNT,
  [LOTTO_RANK.fourth]: INITIAL_COUNT,
  [LOTTO_RANK.third]: INITIAL_COUNT,
  [LOTTO_RANK.second]: INITIAL_COUNT,
  [LOTTO_RANK.first]: INITIAL_COUNT,
  [LOTTO_RANK.none]: INITIAL_COUNT,
});
