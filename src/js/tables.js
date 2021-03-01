import { LOTTO_TABLE } from "./constants.js";

export const prizeTable = {
  // 각 랭킹에 대한 정보를 담은 테이블
  ranking1: {
    num: 0,
    prize: LOTTO_TABLE.RANKING1.PRIZE,
    condition: LOTTO_TABLE.RANKING1.CONDITION,
  },
  ranking2: {
    num: 0,
    prize: LOTTO_TABLE.RANKING2.PRIZE,
    condition: LOTTO_TABLE.RANKING2.CONDITION,
  },
  ranking3: {
    num: 0,
    prize: LOTTO_TABLE.RANKING3.PRIZE,
    condition: LOTTO_TABLE.RANKING3.CONDITION,
  },
  ranking4: {
    num: 0,
    prize: LOTTO_TABLE.RANKING4.PRIZE,
    condition: LOTTO_TABLE.RANKING4.CONDITION,
  },
  ranking5: {
    num: 0,
    prize: LOTTO_TABLE.RANKING5.PRIZE,
    condition: LOTTO_TABLE.RANKING5.CONDITION,
  },
  noPrize: {
    num: 0,
    prize: LOTTO_TABLE.NO_PRIZE.PRIZE,
    condition: LOTTO_TABLE.NO_PRIZE.CONDITION,
  },
};

export const rankingTable = {
  // 맞춘 갯수: 해당 로또 랭킹
  3: LOTTO_TABLE.RANKING5.NAME,
  4: LOTTO_TABLE.RANKING4.NAME,
  5: LOTTO_TABLE.RANKING3.NAME,
  6: LOTTO_TABLE.RANKING1.NAME,
};
