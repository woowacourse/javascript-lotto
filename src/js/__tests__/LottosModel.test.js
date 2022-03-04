import LottosModel from '../models/LottosModel';

describe('로또 당첨 기준 테스트', () => {
  const lottosModel = new LottosModel();
  lottosModel.winningNumberList = [1, 2, 3, 4, 5, 6, 7];

  it('일치하는 로또 번호가 3개일 때 5등이 되어야 한다.', () => {
    const lottoNumberList = [1, 2, 3, 10, 11, 12];
    expect(lottosModel.getWinningRank(lottoNumberList)).toBe(4);
  });

  it('일치하는 로또 번호가 4개일 때 4등이 되어야 한다.', () => {
    const lottoNumberList = [1, 2, 3, 4, 11, 12];
    expect(lottosModel.getWinningRank(lottoNumberList)).toBe(3);
  });

  it('일치하는 로또 번호가 5개일 때 3등이 되어야 한다.', () => {
    const lottoNumberList = [1, 2, 3, 4, 5, 12];
    expect(lottosModel.getWinningRank(lottoNumberList)).toBe(2);
  });

  it('일치하는 로또 번호가 5개이고, 보너스 번호가 동일할 때 2등이 되어야 한다.', () => {
    const lottoNumberList = [1, 2, 3, 4, 5, 7];
    expect(lottosModel.getWinningRank(lottoNumberList)).toBe(1);
  });

  it('일치하는 로또 번호가 6개일 때 1등이 되어야 한다.', () => {
    const lottoNumberList = [1, 2, 3, 4, 5, 6];
    expect(lottosModel.getWinningRank(lottoNumberList)).toBe(0);
  });
});

describe('로또 당첨 결과 테스트', () => {
  it('로또가 당첨 되었을 때 횟수가 정상적으로 집계 되어야 한다.', () => {
    const lottosModel = new LottosModel();
    lottosModel.buy(1000);
    const lottoNumberList = lottosModel.list[0].split(',');
    const bonusNumberInput = 0;
    lottoNumberList.push(bonusNumberInput);

    lottosModel.winningNumberList = lottoNumberList;

    expect(lottosModel.getWinningCount()[0]).toBe(1);
  });

  it('로또 당첨 번호를 기준으로 수익률을 정상적으로 계산할 수 있어야 한다.', () => {
    const lottosModel = new LottosModel();
    lottosModel.buy(1000);

    const lottoNumberList = lottosModel.list[0].split(',');
    lottoNumberList.splice(0, 3);
    lottoNumberList.push('0', '0', '0', '0');

    lottosModel.winningNumberList = lottoNumberList;
    const winningCountList = lottosModel.getWinningCount();
    expect(lottosModel.getWinningProfitRatio(winningCountList)).toBe(400);
  });
});
