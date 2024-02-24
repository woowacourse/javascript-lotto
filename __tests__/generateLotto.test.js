import LottoGenerator from '../src/domains/LottoGenerator';

describe('당첨 번호 6개를 랜덤으로 생성하는지 확인하는 테스트.', () => {
  let lottoGenerator;
  let generatedLottos;
  const ticketCount = 1;

  beforeEach(() => {
    lottoGenerator = new LottoGenerator(ticketCount);
    generatedLottos = lottoGenerator.generateLotto();
  });

  test('생성된 배열 안의 랜덤 값이 1 ~ 45 사이의 숫자인지 확인한다.', () => {
    generatedLottos.forEach((lotto) => {
      expect(lotto).toBeGreaterThanOrEqual(1);
      expect(lotto).toBeLessThanOrEqual(45);
    });
  });

  test('생성된 배열 안의 랜덤 값의 개수가 6개인지 확인한다.', () => {
    expect(generatedLottos.length).toBe(6);
  });

  test('생성된 배열 안의 랜덤 값들이 중복되지 않는지 확인한다.', () => {
    const lottoSet = new Set(generatedLottos);

    expect(lottoSet.size).toBe(6);
  });
});
