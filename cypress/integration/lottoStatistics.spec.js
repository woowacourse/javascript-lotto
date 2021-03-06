import { LottoMachine } from '../../src/js/model/index.js';

describe('Lotto test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('당첨 통계가 정확한지 확인한다.', () => {
    const lottoMachine = new LottoMachine();
    const winningNumbers = [1, 2, 3, 4, 5, 6, 7];
    const lottoNumbers = {
      '1st': [1, 2, 3, 4, 5, 6],
      '2nd': [1, 2, 3, 4, 5, 7],
      '3rd': [1, 2, 3, 4, 5, 10],
      '4th': [1, 2, 3, 4, 11, 12],
      '5th': [1, 2, 3, 11, 12, 13],
      '6th': [1, 2, 10, 11, 12, 13],
    };

    lottoMachine.insert(6000);
    lottoMachine.publishLottoByManual(lottoNumbers['1st']);
    lottoMachine.publishLottoByManual(lottoNumbers['2nd']);
    lottoMachine.publishLottoByManual(lottoNumbers['3rd']);
    lottoMachine.publishLottoByManual(lottoNumbers['4th']);
    lottoMachine.publishLottoByManual(lottoNumbers['5th']);
    lottoMachine.publishLottoByManual(lottoNumbers['6th']);

    const { earningRate } = lottoMachine.getWinningStatistics(winningNumbers);
    expect(earningRate).to.equal(33859150);
  });
});
