import Validator from "../utils/Validator.js"
import { SETTINGS, ERROR_MESSAGE } from "../constants/Config.js";
import { $, $$ } from "../utils/Dom.js";

class WebController {
  constructor() {
    this.play();
  }

  play() {
    $(".input-money-btn").addEventListener("click", this.getBuyMoney);
  }

  getBuyMoney = (e) => {
    e.preventDefault();
    
    try {
      const buyMoney = $(".input-money").value;
      this.validateBuyMoney(buyMoney);
      $(".print-lottos").classList.add("show");
      $(".purchase-amount").innerHTML = `총 ${buyMoney/SETTINGS.DIVIDE_MONEY_VALUE}개를 구매하였습니다.`;
    } catch (e) {
      alert(e.message)
    }
  };

  validateBuyMoney(buyMoney) {
    Validator.isNumber(buyMoney);
    Validator.isDividedByThousand(buyMoney);
    Validator.isPositiveInteger(buyMoney);
  }
  
}

export default WebController;
