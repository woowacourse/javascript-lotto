import { ERROR_MESSAGE } from '../constants/errorMessage';
import LottoList from '../domains/LottoList';

describe('로또 리스트 도메인 테스트', () => {
  it('로또 게임 모델에 금액이 정상적으로 입력되면, 구매할 수 있는 로또의 수를 반환할 수 있어야 한다.', () => {
    const lottoList = new LottoList();
    const charge = 5000;
    const expectedAvailableLottoAmount = 5;

    lottoList.createLottoList(charge);

    expect(lottoList.getLottoList().length).toBe(expectedAvailableLottoAmount);
  });

  it('금액이 1000보다 작은 경우 다시 입력해야 한다는 에러를 발생시킨다.', () => {
    const lottoList = new LottoList();
    const lessThanLottoPriceCharge = 500;
    try {
      lottoList.createLottoList(lessThanLottoPriceCharge);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
    }
  });

  it('금액 값을 통해 구매할 수 있는 로또 갯수를 구하고, 이를 통해 해당 갯수만큼의 로또를 가진 lottoList 멤버 값을 구할 수 있다.', () => {
    const lottoList = new LottoList();
    const charge = 5000;
    const availableLottoAmount = lottoList.exchangeChargeToLottoAmount(charge);
    lottoList.createLottoList(charge);

    expect(lottoList.getLottoList().length).toBe(availableLottoAmount);
  });

  it('입력한 금액이 100000원 이상인 경우 다시 입력해야한다는 에러를 발생시킨다.', () => {
    const lottoList = new LottoList();
    const charge = 100000;
    try {
      lottoList.createLottoList(charge);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
    }
  });

  it('보너스 번호를 포함하여 중복된 숫자가 있으면 에러를 출력한다', () => {
    const lottoList = new LottoList();
    const charge = 10000;

    lottoList.createLottoList(charge);

    const winningNumbers = [5, 5, 15, 30, 33, 28];
    const bonusNumber = 17;
    try {
      lottoList.computeWinResultStatistics(winningNumbers, bonusNumber);
    } catch ({ message }) {
      expect(message === ERROR_MESSAGE.WIN_NUMBER_IS_INVALIDATE).toBe(true);
    }
  });
});
