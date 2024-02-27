import { initializeInputValue } from './uiUtils.js';
import { money, lottoMachine } from '../instances.js';
import { renderBoughtLottos, renderBoughtLottosLength, visibilizeWinningLottoForm } from './boughtLottoHandlers.js';

export const inputMoneyHandler = (e) => {
  e.preventDefault();

  const inputMoney = moneyInput.value;
  money.fromInputValue(Number(inputMoney));
  const buyingMoney = money.getMoney();
  lottoMachine.makeLottoByMoney(buyingMoney);
  const boughtLottos = lottoMachine.getLottos();

  renderBoughtLottosLength(boughtLottos.length);
  renderBoughtLottos(boughtLottos);
  visibilizeWinningLottoForm();
  initializeInputValue(moneyInput);
};
