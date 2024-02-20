import LottoGenerator from '../src/domains/LottoGenerator';

describe('당첨 번호 6개를 랜덤으로 생성하는지 확인하는 테스트.', () => {
  test('생성된 배열 안의 숫자가 1 ~ 45 사이의 숫자인지 확인한다.', () => {
    const lottoGenerator = new LottoGenerator();
    const lottoList = lottoGenerator.generateRandomLotto();

    lottoList.forEach((lotto) => {
      expect(lotto).toBeGreaterThanOrEqual(1);
      expect(lotto).toBeLessThanOrEqual(45);
    });
  });

  test('생성된 배열 안의 숫자가 6글자인지 확인한다.', () => {
    const lottoGenerator = new LottoGenerator();
    const lottoList = lottoGenerator.generateRandomLotto();

    expect(lottoList.length).toBe(6);
  });

  test('생성된 배열 안의 숫자가 중복되지 않는지 확인한다.', () => {
    const lottoGenerator = new LottoGenerator();
    const lottoList = lottoGenerator.generateRandomLotto();
    const lottoSet = new Set(lottoList);

    expect(lottoSet.size).toBe(6);
  });
});
