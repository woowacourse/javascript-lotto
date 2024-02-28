import { WEB_MESSAGE } from "../constants/system.js";

const WebView = {
  showAfterPurchases() {
    const successPurchases = document.querySelectorAll(".after_purchase");

    successPurchases.forEach((purchase) => {
      const purchaseStyle = purchase.style;
      purchaseStyle.visibility = "visible";
    });
  },

  showPurchaseAmount(purchaseAmount) {
    const purchaseAmountInput = document.getElementById("input_purchaseAmount");
    const purchaseNumber = document.getElementById("purchase_number");
    const invalidPurchaseAmount = document.getElementById(
      "invalid_purchaseAmount",
    );
    purchaseNumber.textContent = WEB_MESSAGE.PURCHASE_AMOUNT(purchaseAmount);
    purchaseAmountInput.value = "";
    invalidPurchaseAmount.innerText = "";
  },

  showLottoList(lottoNumberArray) {
    const list = document.getElementById("lotto_list");

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
    icon.innerText = WEB_MESSAGE.LOTTO_ICON;
    lotto.innerText = lottoNumber.sort((a, b) => a - b).join(", ");
    li.appendChild(icon);
    li.appendChild(lotto);
    return li;
  },

  showGameResult(rank) {
    const reversedRank = Object.values(rank).slice().reverse();
    const tableRows = document.querySelectorAll(
      "#result_body tr:not(:first-child)",
    );
    tableRows.forEach((row, index) => {
      this.oneTableRow(row, reversedRank[index]);
    });
  },

  oneTableRow(row, count) {
    const tdElement = row.querySelector("td:nth-child(3)");
    if (tdElement) {
      tdElement.textContent = WEB_MESSAGE.WIN_COUNT(count);
    }
  },

  showProfit(profit) {
    const profitElement = document.getElementById("profit");
    profitElement.textContent = WEB_MESSAGE.PROFIT(profit);
  },
};
export default WebView;
