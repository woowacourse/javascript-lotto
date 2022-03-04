/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

import '../utils/customPrototypeMethod';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import LottoRound from '../models/LottoRound';
import Lotto from '../models/Lotto';

const charge = 5000;

describe('로또 게임 모델 테스트', () => {
  it('로또 게임 모델에 금액이 정상적으로 입력되면, 구매할 수 있는 로또의 수를 반환할 수 있어야 한다.', () => {
    const lottoRound = new LottoRound();
    const expectedAvailableLottoAmount = 5;
    const availableLottoAmount = lottoRound.exchangeChargeToLottoAmount(charge);
    expect(availableLottoAmount).toBe(expectedAvailableLottoAmount);
  });

  it('금액은 1000이상의 숫자여야한다.', () => {
    const lottoRound = new LottoRound();
    const lessThanLottoPriceCharge = 500;
    try {
      lottoRound.exchangeChargeToLottoAmount(lessThanLottoPriceCharge);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
    }
  });

  it('로또 번호 배열들을 입력하여 로또 모델을 생성하고 관리할 수 있어야 한다.', () => {
    const lottoRound = new LottoRound();
    const availableLottoAmount = lottoRound.exchangeChargeToLottoAmount(charge);

    lottoRound.createLottoList(charge);

    expect(lottoRound.lottoList.length).toBe(availableLottoAmount);
  });

  it('lottoList의 getter는 깊게 복사된 값을 반환한다.', () => {
    const lottoRound = new LottoRound();

    lottoRound.createLottoList(charge);

    const lottoListFromGetterFunc = lottoRound.getLottoList();
    expect(lottoListFromGetterFunc).toEqual(lottoRound.lottoList);
  });

  it('당첨 결과를 이용하여 당첨 통계와 수익률을 반환할 수 있어야 한다.', () => {
    const lottoRound = new LottoRound();
    const lottoList = [];
    const winningNumbers = [1, 2, 3, 4, 5, 6, 10];
    const result = [1, 0, 1, 1, 0, 66718333, 0];

    lottoList.push(Lotto.create([1, 2, 3, 4, 5, 6]));
    lottoList.push(Lotto.create([1, 2, 3, 4, 5, 7]));
    lottoList.push(Lotto.create([1, 2, 3, 4, 7, 8]));

    lottoRound.lottoList = lottoList;
    expect(lottoRound.getRoundResult(winningNumbers)).toEqual(result);
  });

  it('게임 초기화가 가능해야 한다.', () => {
    const lottoRound = new LottoRound();
    const initializedLottoRound = new LottoRound();

    lottoRound.createLottoList(charge);
    lottoRound.initialize();

    expect(lottoRound).toEqual(initializedLottoRound);
  });
});
