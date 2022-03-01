import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';
import { ERROR_MESSAGE, CONDITIONS } from '../constants/constants';
import { Lotto } from '../model/Lotto.js';

test('로또 구매 금액을 입력할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(1000);
  expect(lottoGame.moneyInput).toBe(1000);
});

test('금액은 음수 일 수 없다.', () => {
  expect(() => {
    validator.isMoneyInputValid(-10);
  }).toThrow();
});

test('금액은 문자 일 수 없다.', () => {
  expect(() => {
    validator.isMoneyInputValid('abc');
  }).toThrow();
});

test('구매를 할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(3000);
  lottoGame.buyLotto();
  expect(lottoGame.lottoWallet.length).toBe(3);
});

test('로또 번호를 중복없이 자동으로 생성한다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(1000);
  lottoGame.buyLotto();
  lottoGame.lottoWallet[0].makeLottoNumber();
  expect(new Set(lottoGame.lottoWallet[0].numbers).size).toBe(6);
});

test('당첨번호6개와 보너스를 입력받을 수 있다', () => {
  const lottoGame = new LottoGame();
  lottoGame.enterWinningNumbers([1, 2, 3, 4, 5, 6]);
  lottoGame.enterBonusNumber(7);
  expect(lottoGame.winningNumbers).toStrictEqual([1, 2, 3, 4, 5, 6]);
  expect(lottoGame.bonusNumber).toStrictEqual(7);
});

test('당첨번호에 중복된 번호가 있을 시 오류를 생성한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 1, 2, 3, 4, 5], 6);
  }).toThrow(ERROR_MESSAGE.HAS_DUPLICATED_WINNING_NUMBER);
});

test('당첨번호와 보너스번호에 중복된 번호가 있을 시 오류를 생성한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 2, 3, 4, 5, 6], 6);
  }).toThrow(ERROR_MESSAGE.HAS_DUPLICATED_BONUS_NUMBER);
});

test('당첨번호는 min,max 사이의 범위여야 한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 2, 3, 4, 5, 46], 6);
  }).toThrow(ERROR_MESSAGE.HAS_OUT_OF_RANGE_NUMBER);
});

test('보너스 번호는 min,max 사이의 범위여야 한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 2, 3, 4, 5, 6], 46);
  }).toThrow(ERROR_MESSAGE.HAS_OUT_OF_RANGE_NUMBER);
});

test('당첨 통계를 구할 수 있다.', () => {
  const lottoGame = new LottoGame();

  //1등(6개일치)
  const temp1 = new Lotto();
  temp1.numbers = [1, 2, 3, 4, 5, 6];
  lottoGame.lottoWallet.push(temp1);

  //2등(5개+보너스일치)
  const temp2 = new Lotto();
  temp2.numbers = [1, 2, 3, 4, 5, 7];
  lottoGame.lottoWallet.push(temp2);

  //3등(5개일치)
  const temp3 = new Lotto();
  temp3.numbers = [1, 2, 3, 4, 5, 10];
  lottoGame.lottoWallet.push(temp3);

  //4등(4개일치)
  const temp4 = new Lotto();
  temp4.numbers = [1, 2, 3, 4, 10, 11];
  lottoGame.lottoWallet.push(temp4);

  //5등(3개일치)
  const temp5 = new Lotto();
  temp5.numbers = [1, 2, 3, 10, 11, 12];
  lottoGame.lottoWallet.push(temp5);

  const temp6 = new Lotto();
  temp6.numbers = [1, 2, 3, 10, 11, 22];
  lottoGame.lottoWallet.push(temp6);

  //그외(3개 미만일치)
  const temp7 = new Lotto();
  temp7.numbers = [11, 12, 13, 14, 15, 17];
  lottoGame.lottoWallet.push(temp7);

  lottoGame.enterWinningNumbers([1, 2, 3, 4, 5, 6]);
  lottoGame.enterBonusNumber(7);
  lottoGame.findResult();

  expect(lottoGame.result).toStrictEqual({
    matchFive: 1,
    matchFiveBonus: 1,
    matchFour: 1,
    matchSix: 1,
    matchThree: 2,
    matchUnderThree: 1,
  });
});

test('수익률을 소수점 둘째자리 까지 구할 수 있다.', () => {
  const lottoGame = new LottoGame();

  //5등(3개일치), 당첨금 = 5000 * 2
  const temp1 = new Lotto();
  temp1.numbers = [1, 2, 3, 10, 11, 12];
  lottoGame.lottoWallet.push(temp1);

  const temp2 = new Lotto();
  temp2.numbers = [1, 2, 3, 10, 11, 22];
  lottoGame.lottoWallet.push(temp2);

  //그외(3개 미만일치), 당첨금 = 0
  const temp3 = new Lotto();
  temp3.numbers = [11, 12, 13, 14, 15, 17];
  lottoGame.lottoWallet.push(temp3);

  lottoGame.enterWinningNumbers([1, 2, 3, 4, 5, 6]);
  lottoGame.enterBonusNumber(7);
  lottoGame.findResult();
  lottoGame.calculateEarnRate();
  expect(lottoGame.earnRate).toStrictEqual(233.33);
});
