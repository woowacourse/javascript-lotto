import LottoMachine from '../models/LottoMachine.js';
import { LOTTO } from '../constants/constants.js';

describe('로또 기계 단위 테스트', () => {
  test('로또 기계는 투입금액에서 로또 가격을 나눈 개수만큼의 로또를 발급해야 한다.', () => {
    const validInputMoney = '6000';
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.lottos = lottoMachine.generateLottos();
    expect(lottoMachine.lottos).toHaveLength(validInputMoney / LOTTO.PRICE);
  });

  test('로또 기계에 1보다 작은 수가 들어오면 에러를 발생시켜야 한다.', () => {
    const validInputMoney = '0';
    const lottoMachine = new LottoMachine();
    expect(() => (lottoMachine.inputMoney = validInputMoney)).toThrow(Error);
  });

  test('로또 기계에 45보다 큰 수가 들어오면 에러를 발생시켜야 한다.', () => {
    const validInputMoney = '46';
    const lottoMachine = new LottoMachine();
    expect(() => (lottoMachine.inputMoney = validInputMoney)).toThrow(Error);
  });

  test('로또 기계는 로또 가격의 단위가 아닌 수가 들어오면 에러를 발생시켜야 한다.', () => {
    const validInputMoney = '1001';
    const lottoMachine = new LottoMachine();
    expect(() => (lottoMachine.inputMoney = validInputMoney)).toThrow(Error);
  });

  test('100,000원 보다 큰 금액으로 로또를 구입할 수 없다.', () => {
    const validInputMoney = '2000000';
    const lottoMachine = new LottoMachine();
    expect(() => (lottoMachine.inputMoney = validInputMoney)).toThrow(Error);
  });
});

describe('로또 기계 당첨 확인 테스트', () => {
  test('로또 기계에서 생성된 번호와 입력된 번호 6개가 일치하면 카운트를 해야한다.', () => {
    const validInputMoney = '1000';
    let candidateWrongNumbers = [1, 2, 3, 4, 5, 6, 7];
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.lottos = lottoMachine.generateLottos();

    const winningNumbers = lottoMachine.lottos[0].numbers.sort(function (a, b) {
      return a - b;
    });
    winningNumbers.forEach(item => {
      candidateWrongNumbers = candidateWrongNumbers.filter(
        number => number !== item
      );
    });
    const winningBonusNumber = candidateWrongNumbers[0];

    lottoMachine.countWinLottos(winningNumbers, winningBonusNumber);
    expect(lottoMachine.winLottos[6]).toBe(1);
  });

  test('로또 기계에서 생성된 번호와 입력된 번호 5개가 일치하면 카운트를 해야한다.', () => {
    const validInputMoney = '1000';
    let candidateWrongNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.lottos = lottoMachine.generateLottos();

    const winningNumbers = lottoMachine.lottos[0].numbers.sort(function (a, b) {
      return a - b;
    });
    winningNumbers.forEach(item => {
      candidateWrongNumbers = candidateWrongNumbers.filter(
        number => number !== item
      );
    });
    const winningBonusNumber = candidateWrongNumbers[0];

    lottoMachine.countWinLottos(
      [...winningNumbers.slice(0, 5), candidateWrongNumbers[1]],
      winningBonusNumber
    );
    expect(lottoMachine.winLottos[5]).toBe(1);
  });

  test('로또 기계에서 생성된 번호와 입력된 번호 5개와 보너스 번호가 일치하면 카운트를 해야한다.', () => {
    const validInputMoney = '1000';
    let candidateWrongNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.lottos = lottoMachine.generateLottos();

    const winningNumbers = lottoMachine.lottos[0].numbers.sort(function (a, b) {
      return a - b;
    });
    winningNumbers.forEach(item => {
      candidateWrongNumbers = candidateWrongNumbers.filter(
        number => number !== item
      );
    });
    const winningBonusNumber = candidateWrongNumbers[0];

    lottoMachine.countWinLottos(
      [...winningNumbers.slice(0, 5), candidateWrongNumbers[1]],
      winningNumbers[5]
    );
    expect(lottoMachine.winLottosWithBonus).toBe(1);
  });

  test('로또 기계에서 생성된 번호와 입력된 번호 4개가 일치하면 카운트를 해야한다.', () => {
    const validInputMoney = '1000';
    let candidateWrongNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.lottos = lottoMachine.generateLottos();

    const winningNumbers = lottoMachine.lottos[0].numbers.sort(function (a, b) {
      return a - b;
    });
    winningNumbers.forEach(item => {
      candidateWrongNumbers = candidateWrongNumbers.filter(
        number => number !== item
      );
    });
    const winningBonusNumber = candidateWrongNumbers[0];

    lottoMachine.countWinLottos(
      [...winningNumbers.slice(0, 4), ...candidateWrongNumbers.slice(1, 3)],
      winningBonusNumber
    );
    expect(lottoMachine.winLottos[4]).toBe(1);
  });

  test('로또 기계에서 생성된 번호와 입력된 번호 3개가 일치하면 카운트를 해야한다.', () => {
    const validInputMoney = '1000';
    let candidateWrongNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const lottoMachine = new LottoMachine();
    lottoMachine.inputMoney = validInputMoney;
    lottoMachine.lottos = lottoMachine.generateLottos();

    const winningNumbers = lottoMachine.lottos[0].numbers.sort(function (a, b) {
      return a - b;
    });
    winningNumbers.forEach(item => {
      candidateWrongNumbers = candidateWrongNumbers.filter(
        number => number !== item
      );
    });
    const winningBonusNumber = candidateWrongNumbers[0];

    lottoMachine.countWinLottos(
      [...winningNumbers.slice(0, 3), ...candidateWrongNumbers.slice(1, 4)],
      winningBonusNumber
    );
    expect(lottoMachine.winLottos[3]).toBe(1);
  });
});
