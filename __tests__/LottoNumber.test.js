import LottoNumber from '../src/domain/entity/LottoNumber.js';

describe('로또 번호 테스트', () => {
  test('성공 케이스', () => {
    const LOTTO_NUMBER = '27';
    expect(() => new LottoNumber(LOTTO_NUMBER)).not.toThrow();
  });
  test('공백을 입력했을때, 에러를 발생시킨다.', () => {
    const BLANK = '';
    expect(() => new LottoNumber(BLANK)).toThrow('[Error]');
  });
});
