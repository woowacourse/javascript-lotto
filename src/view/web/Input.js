import Dom from '../../utils/Dom';
import Web from '../../utils/Web';
import Render from './Render';

const Input = {
  async readMoney() {
    if (Dom.$('#read-money-input') === null) Render.moneyInputAndSubmitButton();
    const money = await Web.readFormInputValue({ form: '#read-money-form', input: '#read-money-input' });
    return money;
  },

  async readWinningNumbers() {
    if (Dom.$('#winning-numbers-input-form') === null) Render.winningNumbersFormInputAndSubmitButton();
    const input = await Web.readFormInputValues({ form: '#winning-numbers-input-form', inputs: '.winning-numbers input' });
    return input;
  },

  async readBonusNumber() {
    Dom.$('.read-winning-numbers button').textContent = '보너스번호 확인 후 결과 확인하기';
    Array.from(Dom.$$('.winning-numbers input')).map((input) => input.disabled = true);
    Dom.$('#read-bonus-number-input').disabled = false;
    const input = await Web.readFormInputValue({ form: '#winning-numbers-input-form', input: '.bonus-number input' });
    return input;
  },

  async readRestartOrExit() {
    if (Dom.$('#restart-button') === null) Render.restartButton();
    const input = await Web.readTagValue({ button: '#restart-button', input: '#restart-value' });
    return input;
  },
};

export default Input;
