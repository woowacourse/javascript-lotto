import '../utils/customPrototypeMethod';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import LottoGame from '../models/LottoGame';

describe('로또 게임 모델 테스트', () => {
  it('로또 게임 모델에 금액이 정상적으로 입력되면, 구매할 수 있는 로또의 수를 반환할 수 있어야 한다.', () => {
    const lottoGame = new LottoGame();
    const charge = 5000;
    const expectedAvailableLottoAmount = 5;
    const availableLottoAmount = lottoGame.exchangeChargeToLottoAmount(charge);
    expect(availableLottoAmount).toBe(expectedAvailableLottoAmount);
  });

  it('금액이 1000보다 작은 경우 다시 입력해야 한다는 에러를 발생시킨다.', () => {
    const lottoGame = new LottoGame();
    const lessThanLottoPriceCharge = 500;
    try {
      lottoGame.exchangeChargeToLottoAmount(lessThanLottoPriceCharge);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
    }
  });

  it('금액 값을 통해 구매할 수 있는 로또 갯수를 구하고, 이를 통해 해당 갯수만큼의 로또를 가진 lottoList 멤버 값을 구할 수 있다.', () => {
    const lottoGame = new LottoGame();
    const charge = 5000;
    const availableLottoAmount = lottoGame.exchangeChargeToLottoAmount(charge);

    lottoGame.createLottoList(charge);

    expect(lottoGame.lottoList.length).toBe(availableLottoAmount);
  });

  it('입력한 금액이 100000원 이상인 경우 다시 입력해야한다는 에러를 발생시킨다.', () => {
    const lottoGame = new LottoGame();
    const charge = 100000;
    try {
      lottoGame.exchangeChargeToLottoAmount(charge);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
    }
  });
});
