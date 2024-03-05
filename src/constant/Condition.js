const CONDITION = {
  lottoNumberMax: 45,
  lottoNumberMin: 1,
  countOfNumberInTicket: 6,
  pricePerLotto: 1000,

  winningPrice: {
    3: 5000,
    4: 50000,
    5: 1500000,
    '5-1': 30000000,
    6: 2000000000,
  },

  winningKeys: [3, 4, 5, '5-1', 6],

  secondPrizeMatchCount: 5,
  secondPrizeMatchBonusCount: 1,

  lottosNumbersIndex: 0,
  purchaseCountIndex: 1,
};

export default CONDITION;
