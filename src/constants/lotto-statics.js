const LOTTO_STATICS = {
  three: {
    price: 5_000,
    number: 3,
  },
  four: {
    price: 50_000,
    number: 4,
  },
  five: {
    price: 1_500_000,
    number: 5,
  },
  fiveBonus: {
    price: 30_000_000,
    number: 5,
  },
  six: {
    price: 2_000_000_000,
    number: 6,
  },
};

Object.values(LOTTO_STATICS).forEach((item) => {
  if (item === LOTTO_STATICS.fiveBonus) {
    item.message = `${item.number}개 일치, 보너스 일치 (${item.price.toLocaleString()}원)`;
  } else {
    item.message = `${item.number}개 일치 (${item.price.toLocaleString()}원)`;
  }
});

export default LOTTO_STATICS;
