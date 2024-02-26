import Web from '../../utils/Web';

const Input = {
  async readMoney() {
    const selector = {
      button: '#read-money-form-submit',
      input: '#read-money-input',
    };

    const money = await Web.readTagValue(selector);
    return money;
  },
};

export default Input;
