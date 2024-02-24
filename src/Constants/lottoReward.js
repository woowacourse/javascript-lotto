import deepFreeze from '../Utils/deepFreeze';

const LOTTO_REWARD = deepFreeze({
  1: {
    prize: 2_000_000_000,
    message: '6개 일치 (2,000,000,000원) - ',
  },
  2: {
    prize: 30_000_000,
    message: '5개 일치, 보너스 볼 일치 (30,000,000원) - ',
  },
  3: {
    prize: 1_500_000,
    message: '5개 일치 (1,500,000원) - ',
  },
  4: {
    prize: 50_000,
    message: '4개 일치 (50,000원) - ',
  },
  5: {
    prize: 5_000,
    message: '3개 일치 (5,000원) - ',
  },
});

export default LOTTO_REWARD;
