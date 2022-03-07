import LottoConsumer from '../LottoConsumer';
import { LOTTO } from '../constants';
import { createRandomNumberList, shuffleArray } from '../utils';

const lottoConsumer = new LottoConsumer();

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe('구입한 로또 번호가 올바르게 생성되는지 확인한다', () => {
  test(`구입한 로또 번호가 ${LOTTO.MIN_NUMBER}에서 ${LOTTO.MAX_NUMBER}까지의 숫자로 섞여있는 랜덤 리스트가 올바르게 생성되는지 확인한다.`, () => {
    const shuffleRandomList = shuffleArray(createRandomNumberList());

    shuffleRandomList.forEach((randomNumber) => {
      expect(randomNumber).toBeWithinRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
    });
  });

  test('구입한 로또 번호가 서로 다른 랜덤한 숫자 6개로 이루어진 값인지 확인한다.', () => {
    const lottoList = lottoConsumer.createLottoList();

    expect(lottoList.length).toBe(new Set(lottoList).size);
  });
});
