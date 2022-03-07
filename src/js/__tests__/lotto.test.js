import Store from '../flux/store';
import initialState from '../flux/initialState';
import createAction from '../flux/actionCreator';
import ACTION from '../flux/actions';

import { LOTTO, PRIZE_MONEY } from '../constants';
import { calculateEarningsRate } from '../utils';

describe('로또 게임을 진행한다.', () => {
  beforeEach(() => {
    window.store = new Store(initialState);
  });

  test('로또를 구입할 금액을 입력할 수 있다.', () => {
    const money = '5000';

    window.store.dispatch(createAction(ACTION.PURCHASE_LOTTO, money));

    expect(window.store.getState().money).toBe(money);
  });

  test('입력한 금액만큼의 로또를 자동 구매할 수 있다.', () => {
    const money = '5000';

    window.store.dispatch(createAction(ACTION.PURCHASE_LOTTO, money));

    expect(window.store.getState().lottoList.length).toBe(Number(money) / LOTTO.PRICE);
  });

  test('당첨 번호를 입력할 수 있다.', () => {
    const winningNumber = ['1', '4', '29', '39', '43', '45', '31'];
    const winningNumbers = ['1', '4', '29', '39', '43', '45'];

    window.store.dispatch(createAction(ACTION.UPDATE_RESULT, winningNumber));

    expect(window.store.getState().winningNumbers).toStrictEqual(winningNumbers);
  });

  test('보너스 번호를 입력할 수 있다.', () => {
    const winningNumber = ['1', '4', '29', '39', '43', '45', '31'];
    const bonusNumber = '31';

    window.store.dispatch(createAction(ACTION.UPDATE_RESULT, winningNumber));

    expect(window.store.getState().bonusNumber).toStrictEqual(bonusNumber);
  });

  test('로또 당첨 결과 모달을 확인할 수 있다.', () => {
    const resultModalVisibility = true;

    window.store.dispatch(createAction(ACTION.TOGGLE_RESULT_MODAL, resultModalVisibility));

    expect(window.store.getState().resultModalVisibility).toBe(true);
  });

  test('로또에 대한 총 수익률을 계산할 수 있다.', () => {
    const originMoney = LOTTO.PRICE * 5;
    const currentMoney = PRIZE_MONEY['5th'];
    const expectEarningsRate = 0;

    const earningsRate = calculateEarningsRate(originMoney, currentMoney);

    expect(earningsRate).toBe(expectEarningsRate);
  });
});
