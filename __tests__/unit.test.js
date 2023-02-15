/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import Lotto from "../src/domain/Lotto";
import InputValidator from "../src/utils/InputValidator";
test('숫자 6개를 받아 로또를 발행한다.', () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(numbers);
  expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
});

// test('구입 금액에 해당하는 만큼 로또를 발행', () => {
//   const money = 3000;
//   const TICKET_PRICE = 1000;
//   const lottoNumbers = [
//     [1, 2, 3, 4, 5, 6],
//     [8, 9, 10, 11, 12, 13],
//     [14, 15, 16, 17, 18, 19],
//   ];
//   const lottos = lottoNumbers.map((numbers) => new Lotto(numbers));

//   expect(lottos).toBe(lottoIssuer(money / TICKET_PRICE));
// });

test('로또 구입 금액은 자연수이다.', () => {
  const a = '1.5';
  expect(() => InputValidator.checkNaturalNumber(a)).toThrow();
});
