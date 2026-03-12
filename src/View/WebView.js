import Validator from "../Validator";

const WebView = {
  readMoney() {
    const purchaseInput = document.querySelector(".purchase-form__input").value;
    Validator.notEmptyString(purchaseInput);
    Validator.stringIsNumber(purchaseInput);

    const money = Number(purchaseInput);
    return money;
  },
};

export default WebView;
