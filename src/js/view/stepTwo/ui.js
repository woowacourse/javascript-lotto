import domList from '@lotto/view/stepTwo/domList';
import createElem from '@lotto/utils/createElem';

const ui = {
  showMoneyValidationText({ message }) {
    domList.moneyInputErrorText.innerText = message;
    domList.moneyInputErrorText.classList.remove('hide');
  },

  hideMoneyValidationText() {
    domList.moneyInputErrorText.classList.add('hide');
  },
};

export default ui;
