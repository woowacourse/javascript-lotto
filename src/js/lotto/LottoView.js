import { showElement, hideElement } from "../utils.js";
import {
  $confirmation,
  $lottoListLabel,
  $lottoTickets,
  $lottoNumbersToggleButton,
  $priceInput,
  $prizeTable,
  $earningRate,
  $winningNumberInputs,
  $bonusNumberInput,
  $manualPurchaseDetail,
  $purchaseProgress,
  $purchaseButtons,
} from "../elements.js";

export default class LottoView {
  constructor() {}

  showPurchaseProgress(totalLottoCount, currentLottoCount) {
    $purchaseProgress.innerHTML = `총 ${totalLottoCount}개의 로또 중 ${currentLottoCount}개를 수동 구매하였습니다.`;
  }

  showPurchaseButtons() {
    $purchaseButtons.innerHTML = `
    <button id="manual-purchase-button" class="btn btn-cyan" type="button">
      수동 구매하기
    </button>
    <button id="auto-purchase-button" class="btn btn-cyan">
      남은 로또 모두 자동 구매하기
    </button>`;
  }

  showPurchase(lottoList, price) {
    const totalLottoCount = price / 1000;

    this.showPurchaseProgress(totalLottoCount, lottoList.length);
    this.showPurchaseButtons();
  }

  showManualPurchaseDetail() {
    const manualPurchaseInputs = `
    <input
      type="number"
      name="manual-purchase-number"
      class="winning-number mx-1 text-center"/>`.repeat(6);

    $manualPurchaseDetail.innerHTML = `
    <form id="manual-purchase-form">
      ${manualPurchaseInputs}
      <button class="btn btn-cyan">구매하기</button>
    </form>`;
  }

  showTickets(num) {
    $lottoTickets.innerHTML = '<span class="mx-1 text-4xl">🎟️ </span>'.repeat(
      num
    );
  }

  showTicketDetails(lottoList) {
    $lottoTickets.innerHTML = `
      <div class="d-flex flex-col">
      ${lottoList
        .map(
          (lotto) => `
          <div class="d-flex flex-row items-center">
              <div class="d-felx items-center mx-1 text-4xl">🎟️ </div>
              <div class="ml-2 lotto-numbers">
                ${lotto.number.join(", ")}
              </div> 
          </div>`
        )
        .join("")}
      </div>`;
  }

  showConfirmation(lottoList) {
    $lottoNumbersToggleButton.checked = false;
    $lottoListLabel.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    this.showTickets(lottoList.length);

    showElement($confirmation);
  }

  showPrizeTable(prizeTable) {
    $prizeTable.innerHTML = [5, 4, 3, 2, 1]
      .map((rankNum) => {
        const ranking = prizeTable[`ranking${rankNum}`];

        return `
          <tr class="text-center">
            <td class="p-3">${ranking.condition}</td>
            <td class="p-3">${ranking.prize}</td>
            <td class="p-3">${ranking.num}개</td>
          </tr>
        `;
      })
      .join("");
  }

  showEarningRate(earningRate) {
    $earningRate.innerHTML = `당신의 총 수익률은 ${earningRate}%입니다.`;
  }

  resetInput($input) {
    $input.value = "";
  }

  resetLottoView() {
    this.resetInput($priceInput);
    this.resetInput($bonusNumberInput);
    $winningNumberInputs.forEach(($winningNumberInput) =>
      this.resetInput($winningNumberInput)
    );

    hideElement($confirmation);
  }
}
