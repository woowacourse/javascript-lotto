const LOTTO_SYSTEM = Object.freeze({
  ranking: Object.freeze([0, 0, 0, 5, 4, 3, 1]),
  lottoPrize: Object.freeze([
    0, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000,
  ]),
  lottoPrice: 1000,
  correctCount: [0, 6, 5, 5, 4, 3],
  lottoRangeMinimum: 1,
  lottoRangeMaximum: 45,
  lottoDigitCount: 6,
});

export default LOTTO_SYSTEM;
