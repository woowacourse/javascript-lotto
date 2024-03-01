import { initializeInputValue } from './uiUtils.js';
import { money, lottoMachine } from '../instances.js';
import { renderBoughtLottos, renderBoughtLottosLength, visibilizeWinningLottoForm } from './boughtLottoHandlers.js';
import safeEventHandlerWithAlertError from '../utils/safeEventHandlerWithAlertError.js';

/**
 * 구입 금액을 입력한후, 올바른 구입 금액이라면 해당 입력값을 반환합니다.
 * @param { string } inputMoney
 * @returns { number }
 */

const inputBuyingLottoMoney = (inputMoney) => {
  money.receiveInjectionValue(Number(inputMoney));

  return money.getMoney();
};

/**
 * 구입금액으로 무작위 로또를 구매합니다.
 * @param { number } buyingLottoMoney
 * @returns { number[] }
 */

const buyLottos = (buyingLottoMoney) => {
  lottoMachine.makeLottoByMoney(buyingLottoMoney);
  const boughtLottos = lottoMachine.getLottos();

  return boughtLottos;
};

export const inputMoneyHandler = (e) => {
  e.preventDefault();

  safeEventHandlerWithAlertError(
    () => {
      const buyingLottoMoney = inputBuyingLottoMoney(moneyInput.value);
      const boughtLottos = buyLottos(buyingLottoMoney);
      renderBoughtLottosLength(boughtLottos.length);
      renderBoughtLottos(boughtLottos);
      visibilizeWinningLottoForm();
    },
    (error) => {
      alert(error.message);
    },
    () => {
      initializeInputValue(moneyInput);
    },
  );
};
