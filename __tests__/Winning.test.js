import { LOTTO_NUMBER_LENGTH, PRIZE } from '../src/constants/common.js';
import Winning from '../src/Model/Winning.js';

test('Winning 클래스 - 입력받은 당첨번호 저장 테스트', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);

  expect(winning.winningNumbers).toEqual(winningNumbers);
});

test('Winning 클래스 - 보너스번호 저장 테스트', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);

  winning.setBonusNumber(7);
  expect(winning.bonusNumber).toBe(7);
});

test.each([
  [[1, 2, 3, 4, 5, 6], 'first'],
  [[1, 2, 3, 4, 5, 7], 'second'],
  [[1, 2, 3, 4, 5, 10], 'third'],
  [[1, 2, 3, 4, 10, 11], 'fourth'],
  [[1, 2, 3, 9, 10, 11], 'fifth'],
])('Winning 클래스 - 당첨 등수 통계 계산 테스트', (boughtLotto, rank) => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);
  winning.setBonusNumber(7);

  winning.calculateRankHistory(boughtLotto);

  expect(winning.rankHistory[rank]).toEqual(1);
});

test('Winning 클래스 - 당첨 금액 전체 합산 테스트', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);
  winning.setBonusNumber(7);

  winning.calculateRankHistory([1, 2, 3, 4, 5, 6]);
  winning.calculateRankHistory([1, 2, 3, 4, 5, 7]);
  winning.calculateRankHistory([1, 2, 3, 4, 5, 10]);
  winning.calculateRankHistory([1, 2, 3, 4, 10, 11]);
  winning.calculateRankHistory([1, 2, 3, 9, 10, 11]);

  const price = 5000;
  const expectedTotalPrize = PRIZE.first + PRIZE.second + PRIZE.third + PRIZE.fourth + PRIZE.fifth;
  const calculatedPrizeRate = winning.getCalculatedPrizeRate(price);

  expect((calculatedPrizeRate / 100) * price).toEqual(expectedTotalPrize);
});

test('Winning 클래스 - 수익률 계산 테스트', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);
  winning.setBonusNumber(7);

  const price = 8000;
  winning.calculateRankHistory([1, 2, 3, 9, 10, 11]);

  expect(winning.getCalculatedPrizeRate(price)).toBe(Number(((PRIZE.fifth / price) * 100).toFixed(1)));
});

test.each([
  [[1, 2, 3, 4, 5]],
  [[1, 2, 3, 4, 5, 6, 7]],
])('Winning 클래스 - 당첨 번호 개수 오류 예외처리', (winningNumbers) => {
  expect(() => {
    new Winning(winningNumbers);
  }).toThrow(`[ERROR] ${LOTTO_NUMBER_LENGTH}개의 숫자를 입력해주세요.`);
});

test('Winning 클래스 - 중복된 당첨 번호 입력 예외처리', () => {
  expect(() => {
    new Winning([1, 2, 3, 4, 5, 5]);
  }).toThrow('[ERROR] 당첨 번호가 중복 입력되었습니다.');
});

test('Winning 클래스 - 보너스 번호가 당첨 번호와 중복될 때 예외 발생', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);

  expect(() => {
    winning.validateBonusNumber(6);
  }).toThrow('[ERROR] 당첨 번호와 중복 입력입니다.');
});

test.each(['a', '!', '3a'])('Winning 클래스 - 숫자가 아닌 보너스 번호 입력 예외처리', (bonusNumber) => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);

  expect(() => {
    winning.validateBonusNumber(bonusNumber);
  }).toThrow('[ERROR] 숫자 이외의 입력입니다.');
});

test.each([0, 46])('Winning 클래스 - 보너스 번호 1 ~ 45 범위 초과 예외처리', (bonusNumber) => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const winning = new Winning(winningNumbers);

  expect(() => {
    winning.validateBonusNumber(bonusNumber);
  }).toThrow('[ERROR] 로또 숫자의 범위는 1 ~ 45 입니다.');
});
