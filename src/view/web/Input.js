import Dom from '../../utils/Dom';
import Web from '../../utils/Web';
import Render from './Render';

const Input = {
  async readMoney() {
    if (Dom.$('#read-money-input') === null) Render.readMoney();
    const money = await Web.readTagValue({ button: '#read-money-form-submit', input: '#read-money-input' });
    return money;
  },

  async readWinningNumbers() {
    if (Dom.$('.read-winning-numbers-input') === null) Render.readWinningNumbers();
    const input = await Web.readTagValues({ button: '#read-winning-numbers-submit', inputs: '.read-winning-numbers-input' });
    return input;
  },

  async readBonusNumber() {
    const input = await Web.readTagValue({ button: '#read-winning-numbers-submit', input: '.read-bonus-number-input' });
    return input;
  },

  async readRestartOrExit() {
    if (Dom.$('.restart-button') === null) Render.readRestartOrExit();
    const input = await Web.readTagValue({ button: '.restart-button', input: '.restart-value' });
    return input;
  },
};

export default Input;
