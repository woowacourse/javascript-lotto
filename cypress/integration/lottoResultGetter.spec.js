import AppStageManager from '../../src/js/model/AppStageManager.js';
import LottoManager from '../../src/js/model/LottoManager.js';
import LottoTicket from '../../src/js/model/LottoTicket.js';
import { BONUS_COUNT } from '../../src/js/constants/lottoRules.js';
import { WINNING_NUMBER_SUBMITTED } from '../../src/js/constants/appStages.js';

describe('당첨통계 계산 메서드 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const winningNumber = {
    numbers: [1, 2, 3, 4, 5, 6],
    bonus: 7,
  };

  it('구매한 로또의 당첨번호 일치 개수를 반환한다.', () => {
    const lottoTicket1 = new LottoTicket([1, 2, 3, 4, 5, 6]);
    lottoTicket1.setTotalMatchCount(winningNumber);
    const lottoTicket2 = new LottoTicket([1, 2, 3, 4, 5, 7]);
    lottoTicket2.setTotalMatchCount(winningNumber);
    const lottoTicket3 = new LottoTicket([1, 2, 3, 4, 5, 8]);
    lottoTicket3.setTotalMatchCount(winningNumber);
    const lottoTicket4 = new LottoTicket([1, 2, 3, 4, 8, 7]);
    lottoTicket4.setTotalMatchCount(winningNumber);
    const lottoTicket5 = new LottoTicket([1, 2, 3, 9, 8, 7]);
    lottoTicket5.setTotalMatchCount(winningNumber);
    const lottoTicket6 = new LottoTicket([1, 2, 10, 9, 8, 7]);
    lottoTicket6.setTotalMatchCount(winningNumber);
    const lottoTicket7 = new LottoTicket([1, 11, 10, 9, 8, 7]);
    lottoTicket7.setTotalMatchCount(winningNumber);
    const lottoTicket8 = new LottoTicket([12, 11, 10, 9, 8, 7]);
    lottoTicket8.setTotalMatchCount(winningNumber);

    expect(lottoTicket1.numOfMatch).to.equal(6);
    expect(lottoTicket2.numOfMatch).to.equal(5 + BONUS_COUNT);
    expect(lottoTicket3.numOfMatch).to.equal(5);
    expect(lottoTicket4.numOfMatch).to.equal(4);
    expect(lottoTicket5.numOfMatch).to.equal(3);
    expect(lottoTicket6.numOfMatch).to.equal(2);
    expect(lottoTicket7.numOfMatch).to.equal(1);
    expect(lottoTicket8.numOfMatch).to.equal(0);
  });

  const stageManager = new AppStageManager();
  const lottoManager = new LottoManager({ stageManager });

  it('구매금액이 5,000원이고 당첨금액이 0원이면, -100의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(5)].map(() => new LottoTicket([7, 8, 9, 10, 11, 12]));

    lottoManager.setStates({ lottoTickets, winningNumber });
    lottoManager.calculateRateOfReturn();
    expect(lottoManager.rateOfReturn).to.equal(-100);
    lottoManager.resetStates();
  });

  it('구매금액이 5,000원이고 당첨금액이 5,000원이면, 0의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(4)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 7, 8, 9]));

    lottoManager.setStates({ lottoTickets, winningNumber });
    lottoManager.calculateRateOfReturn();
    expect(lottoManager.rateOfReturn).to.equal(0);
    lottoManager.resetStates();
  });

  it('구매금액이 5,000원이고 당첨금액이 2,000,000,000원이면, 39999900의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(4)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 4, 5, 6]));

    lottoManager.setStates({ lottoTickets, winningNumber });
    lottoManager.calculateRateOfReturn();
    expect(lottoManager.rateOfReturn).to.equal(39999900);
    lottoManager.resetStates();
  });

  it('구매금액이 13,000원이고 당첨금액이 5,000원이면, -61.54의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(12)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 11, 12, 13]));

    lottoManager.setStates({ lottoTickets, winningNumber });
    lottoManager.calculateRateOfReturn();
    expect(lottoManager.rateOfReturn).to.equal(-61.54);
    lottoManager.resetStates();
  });
});
