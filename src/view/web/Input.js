import Dom from '../../utils/Dom';
import Web from '../../utils/Web';

const Input = {
  async readMoney() {
    Dom.createAppendTagNode({ target: '.read-money-form', tag: 'input', attribute: { id: 'read-money-input', type: 'text', placeholder: '금액' } });
    Dom.createAppendTagNode({
      target: '.read-money-form', tag: 'button', attribute: { id: 'read-money-form-submit', type: 'button' }, text: '구입',
    });

    const money = await Web.readTagValue({ button: '#read-money-form-submit', input: '#read-money-input' });
    return money;
  },

  async readWinningNumbers() {
    const input = await Web.readTagValues({ button: '#read-winning-numbers-submit', inputs: '.read-winning-numbers-input' });
    return input;
  },
};

export default Input;
