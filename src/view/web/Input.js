import Web from '../../utils/Web';
import Render from './Render';

const Input = {
  async readMoney() {
    Render.readMoney();
    const money = await Web.readTagValue({ button: '#read-money-form-submit', input: '#read-money-input' });
    return money;
  },

  async readWinningNumbers() {
    Render.readWinningNumbers();
    const input = await Web.readTagValues({ button: '#read-winning-numbers-submit', inputs: '.read-winning-numbers-input' });
    return input;
  },
};

export default Input;
