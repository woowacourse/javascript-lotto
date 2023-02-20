import { LOTTO } from '../src/constants';
import Lotto from '../src/domain/Lotto';
import InputValidator from '../src/utils/InputValidator';

test('숫자 6개를 받아 로또를 발행한다.', () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(numbers);
  expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
});

test('로또 번호는 6개를 입력해야하며, 그렇지 않으면 에러가 발생한다.', () => {
  const lotto = [1, 2, 3, 4, 5];
  expect(() => InputValidator.checkArrayLength(lotto, LOTTO.length)).toThrow();
});

test('로또 구입 금액은 String 타입 자연수이며, 그렇지 않으면 에러가 발생한다.', () => {
  const stringNumber = '1.5';
  expect(() => InputValidator.checkNaturalNumber(stringNumber)).toThrow();
});

test('1000원 단위로 나뉘는지 검사하며, 그렇지 않으면 에러가 발생한다.', () => {
  const money = 14100;
  expect(() => InputValidator.checkFallApart(money, LOTTO.price)).toThrow();
});

test('로또 번호는 1~45의 String 타입 자연수이며, 그렇지 않으면 에러가 발생한다.', () => {
  const stringNumber = '0';
  expect(() => InputValidator.checkLottoNumber(number)).toThrow();
});

test('각 번호는 중복되지 않는 수이며, 그렇지 않으면 에러가 발생한다.', () => {
  const numbers = [1, 2, 3, 4, 5, 5];
  expect(() => InputValidator.checkDuplicatedNumbers(numbers)).toThrow();
});

test('입력값은 y 혹은 n 만 가능하며, 그렇지 않으면 에러가 발생한다.', () => {
  const command = 's';
  expect(() => InputValidator.checkRetryCommand(command)).toThrow();
});

test('로또 결과 계산', () => {
  const numbers = ['1', '2', '3', '4', '5', '6'];
  const lotto = new Lotto(numbers);
  const winningNumber = ['1', '2', '3', '4', '5', '7'];
  const bonusNumber = '6';
  expect(lotto.calculateRanking({ main: winningNumber, bonus: bonusNumber })).toEqual(2);
});
