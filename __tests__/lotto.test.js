/* eslint-disable */
import Lotto from '../src/domain/lotto.js';
import { ERROR_MESSAGES } from '../src/constant/index.js';

describe('로또 기능 테스트', () => {
  test('로또 번호가 7개인 경우 에러를 반환', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6, 7];

    expect(() => {
      new Lotto(lottoNumbers);
    }).toThrow(ERROR_MESSAGES.incorrect_length);
  });

  test('로또 번호가 6개인 경우 정상 작동', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new Lotto(lottoNumbers);
    }).not.toThrow(ERROR_MESSAGES.duplicate);
  });

  test('로또 번호가 중복된 경우 에러를 반환', () => {
    const lottoNumbers = [1, 1, 2, 3, 4, 5];

    expect(() => {
      new Lotto(lottoNumbers);
    }).toThrow(ERROR_MESSAGES.duplicate);
  });
});
