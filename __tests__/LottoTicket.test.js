import LottoTicket from '../src/domain/LottoTicket';

describe('LottoTicket 생성 테스트', () => {
  test('1 ~ 45 사이의 자연수 6개를 입력하면, 유효한 로또 객체가 생성된다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6];

    expect(() => new LottoTicket(numbers).not.toThrow());
  });

  test('로또 번호가 6개가 아닌 경우 에러가 발생한다.', () => {
    const numbers = [1, 3, 13, 23, 45];

    expect(() => new LottoTicket(numbers)).toThrow();
  });

  test('로또 번호의 범위가 1 ~ 45가 아니면 에러가 발생한다.', () => {
    const numbers = [1, 3, 4, 5, 6, 56];

    expect(() => new LottoTicket(numbers)).toThrow();
  });

  test('중복된 로또 번호가 있으면 에러가 발생한다.', () => {
    const numbers = [1, 2, 3, 4, 5, 5];

    expect(() => new LottoTicket(numbers).toThrow());
  });
});

describe('각 LottoTicket의 당첨번호 개수를 확인한다.', () => {
  const lottoTicket = new LottoTicket([1, 2, 3, 4, 5, 6]);

  test('당첨번호가 존재할 경우 맞춘 개수를 반환한다.', () => {
    const winningNumbers = [1, 2, 3, 7, 8, 9];

    expect(lottoTicket.countMatchedNumbers(winningNumbers)).toEqual(3);
  });

  test('당첨번호가 존재하지 않을 경우 0을 반환한다.', () => {
    const winningNumbers = [7, 8, 9, 10, 11, 12];

    expect(lottoTicket.countMatchedNumbers(winningNumbers)).toEqual(0);
  });
});
