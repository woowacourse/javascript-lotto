import { SETTINGS } from "../constants/Config.js";
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
    const buyMoney = $(".input-money").value;
    $(".print-lottos").classList.add("show");
    $(".purchase-amount").innerHTML = `총 ${buyMoney/SETTINGS.DIVIDE_MONEY_VALUE}개를 구매하였습니다.`;
  };
}

export default WebController;
