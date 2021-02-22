export default function getPrizeTable() {
  return {
    ranking1: {
      num: 0,
      prize: 2000000000,
      condition: "6개",
    },
    ranking2: {
      num: 0,
      prize: 30000000,
      condition: "5개 + 보너스볼",
    },
    ranking3: {
      num: 0,
      prize: 1500000,
      condition: "5개",
    },
    ranking4: {
      num: 0,
      prize: 50000,
      condition: "4개",
    },
    ranking5: {
      num: 0,
      prize: 5000,
      condition: "3개",
    },
    noPrize: {
      num: 0,
      prize: 0,
      condition: "2개 이하",
    },
  };
}
