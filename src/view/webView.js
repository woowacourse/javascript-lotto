import { WEB_MESSAGE } from "../constants/system.js";

const successPurchases = document.querySelectorAll(".after_purchase");

const purchaseAmountInput = document.getElementsByClassName(
  "purchase-section__input",
)[0];
const purchaseNumber = document.getElementsByClassName("purchase_number")[0];
const invalidPurchaseAmount = document.getElementsByClassName(
  "purchase-section__invalid",
)[0];

const list = document.getElementsByClassName("lotto_list")[0];
const profitElement = document.getElementsByClassName(
  "result-dialog__profit",
)[0];

const WebView = {
  showAfterPurchases() {
    successPurchases.forEach((purchase) => {
      const purchaseStyle = purchase.style;
      purchaseStyle.visibility = "visible";
    });
  },

  showPurchaseAmount(purchaseAmount) {
    purchaseNumber.textContent = WEB_MESSAGE.PURCHASE_AMOUNT(purchaseAmount);
    purchaseAmountInput.value = "";
    invalidPurchaseAmount.textContent = "";
  },

  showLottoList(lottoNumberArray) {
    lottoNumberArray.forEach((lottoNumber) => {
      this.oneLotto(lottoNumber);
      const li = this.oneLotto(lottoNumber);
      list.appendChild(li);
    });
  },

  oneLotto(lottoNumber) {
    const li = document.createElement("li");
    const icon = document.createElement("span");
    const lotto = document.createElement("span");
    icon.textContent = WEB_MESSAGE.LOTTO_ICON;
    lotto.textContent = lottoNumber.sort((a, b) => a - b).join(", ");
    li.appendChild(icon);
    li.appendChild(lotto);
    return li;
  },

  showGameResult(rank) {
    const reversedRank = Object.values(rank).slice().reverse();
    const tableRows = document.querySelectorAll(".result_row");
    tableRows.forEach((row, index) => {
      this.showPrizeResultOneRow(row, reversedRank[index]);
    });
  },

  showPrizeResultOneRow(row, count) {
    const tdElement = row.querySelector("td:nth-child(3)");
    if (tdElement) {
      tdElement.textContent = WEB_MESSAGE.WIN_COUNT(count);
    }
  },

  showProfit(profit) {
    profitElement.textContent = WEB_MESSAGE.PROFIT(profit);
  },
};
export default WebView;
