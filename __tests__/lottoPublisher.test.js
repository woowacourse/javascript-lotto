import LottoPublisher from '../src/domain/LottoPublisher';

describe('로또 발행기 클래스 테스트', () => {
  test('랜덤 로또가 개수만큼 잘 발행되는지 확인한다.', () => {
    const lottoPublisher = new LottoPublisher(3, []);
    expect(lottoPublisher.publishLottos()).toHaveLength(3);
  });

  test('원하는 숫자를 넣은 로또가 개수만큼 발행되는지 확인한다.', () => {
    const lotto1Numbers = [1, 2, 3, 4, 5, 6];
    const lotto2Numbers = [6, 7, 8, 9, 10, 11];
    const lottoPublisher = new LottoPublisher(2, [lotto1Numbers, lotto2Numbers]);
    lottoPublisher.publishLottos();
    expect(lottoPublisher.publishLottos()).toHaveLength(2);
    expect(lottoPublisher.lottoNumbers).toEqual([
      [1, 2, 3, 4, 5, 6],
      [6, 7, 8, 9, 10, 11],
    ]);
  });
});
