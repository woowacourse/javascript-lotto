import LottoModel from '../models/LottoModel.js';
import WinningNumberController from '../controllers/subController/WinningNumberController.js';

describe('금액이 주어지면', () => {
  test('발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const lottoModel = new LottoModel();
    const purchaseAmount = 2000;

    expect(lottoModel.getCountOfLotto(purchaseAmount)).toBe(2);
  });
});

describe('당첨번호와 로또 리스트가 주어지면', () => {
  const winningNumberController = new WinningNumberController();
  const winningNumbers = [1, 23, 16, 42, 34, 9];
  const lottoNumbersList = [
    [1, 23, 16, 42, 34, 9],
    [2, 24, 17, 43, 35, 10],
    [6, 23, 16, 42, 34, 9],
  ];

  test('당첨번호와 생성된 로또 한 개의 일치하는 개수를 구할 수 있다.', () => {
    const bonusNumber = 45;

    expect(
      winningNumberController.countSameNumber(
        lottoNumbersList[0],
        winningNumbers,
        bonusNumber
      )
    ).toBe(6);

    expect(
      winningNumberController.countSameNumber(
        lottoNumbersList[1],
        winningNumbers,
        bonusNumber
      )
    ).toBe(0);
  });

  test('일치하는 개수가 5개일 때 보너스를 확인하고, 보너스 개수를 추가할 수 있다.', () => {
    const bonusNumber = 6;
    expect(
      winningNumberController.countSameNumber(
        lottoNumbersList[2],
        winningNumbers,
        bonusNumber
      )
    ).toBe(5.5);
  });

  test('각 로또 일치 개수를 담은 리스트를 구할 수 있다.', () => {
    const bonusNumber = 6;
    expect(
      winningNumberController.createCountList(
        lottoNumbersList,
        winningNumbers,
        bonusNumber
      )
    ).toEqual([6, 0, 5.5]);
  });

  test('당첨된 로또의 개수별 통계를 구할 수 있다.', () => {
    const CountList = [1, 3, 4, 5, 5.5, 6];
    const answerStatistic = {
      under: 1,
      three: 1,
      four: 1,
      five: 1,
      fiveBonus: 1,
      six: 1,
    };

    expect(
      winningNumberController.createStatisticWithCountList(CountList)
    ).toEqual(answerStatistic);
  });

  test('총 당첨금을 구할 수 있다.', () => {
    const lottoModel = new LottoModel();
    const winningStatistic = {
      under: 1,
      three: 1,
      four: 1,
      five: 1,
      fiveBonus: 1,
      six: 1,
    };

    lottoModel.setState({ winningStatistic });

    expect(lottoModel.getSumWinnings()).toBe(
      5000 + 50000 + 1500000 + 30000000 + 2000000000
    );
  });

  test('당첨금과 구입 금액으로 수익률을 구할 수 있다.', () => {
    const lottoModel = new LottoModel();
    const amount = 1000;
    const countList = [1, 3, 4, 5, 5.5, 6];
    const winningStatistic =
      winningNumberController.createStatisticWithCountList(countList);

    lottoModel.setState({ amount, winningStatistic });

    expect(lottoModel.getEarningRatio()).toBe(
      ((5000 + 50000 + 1500000 + 30000000 + 2000000000) / 1000) * 100
    );
  });
});
