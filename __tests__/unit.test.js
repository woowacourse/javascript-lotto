import generateRandomNumber from '../src/generateRandomNumber';
import LottoMachine from '../src/models/LottoMachine';

describe('로또를 뽑는 기능', () => {
  test('랜덤한 숫자가 1 이상 45 이하이다.', () => {
    const min = 1;
    const max = 45;

    const number = generateRandomNumber(min, max);

    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });

  test('중복되지 않는 숫자가 6개이다.', () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = lottoMachine.makeLottoNumbers();

    expect(new Set(lottoNumbers).size).toBe(6);
  });

  test('6개의 숫자가 정렬되어있다.', () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = lottoMachine.makeLottoNumbers();

    lottoNumbers.reduce((acc, cur) => {
      expect(acc).toBeLessThan(cur);
      return cur;
    }, 0);
  });
});
