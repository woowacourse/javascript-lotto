import Console from "../../utils/Console.js";
import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";

export class OutputView {
  printAmount(price) {
    const amountText = document.querySelector("#amount-text");
    const amount = price / AMOUNT_PRICE;
    amountText.innerHTML = `총 ${amount}개를 구매하였습니다.`;
  }
  printLottos(lottos) {
    const lottoListUL = document.querySelector("#lotto-list");
    const html = lottos
      .getLottoList()
      .map((lotto) => {
        const lottoNumbers = lotto.getNumbers();
        return `<li>🎟️ ${lottoNumbers.join(", ")}</li>`;
      })
      .join("");
    lottoListUL.innerHTML = html;
  }
  printStatistics(statistics) {
    const uiModal = document.querySelector("#modal .ui-modal");
    uiModal.style.display = "flex";

    const resultStaticsticTbody = document.querySelector(
      "#result-staticstic tbody",
    );

    const html = `
                      <tr>
                        <td class="align-center">3개</td>
                        <td class="align-center">5,000</td>
                        <td class="align-center">${statistics[5]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">4개</td>
                        <td class="align-center">50,000</td>
                        <td class="align-center">${statistics[4]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">5개</td>
                        <td class="align-center">1,500,000</td>
                        <td class="align-center">${statistics[3]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">5개+보너스볼</td>
                        <td class="align-center">30000,000</td>
                        <td class="align-center">${statistics[2]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">6개</td>
                        <td class="align-center">2,000,000,000</td>
                        <td class="align-center">${statistics[1]}개</td>
                      </tr>
    `;

    resultStaticsticTbody.innerHTML = html;
  }
  printRate(rate) {
    const rateText = document.querySelector("#rate-text");
    const html = `당신의 총 수익률은 ${rate}%입니다.`;
    rateText.innerHTML = html;
  }
  printReset() {
    const uiModal = document.querySelector("#modal .ui-modal");
    uiModal.style.display = "none";

    document
      .querySelectorAll("#winning-lottos .ui-pin")
      .forEach((pinElement) => {
        pinElement.querySelector("input").value = "";
      });

    const priceInput = document.querySelector("#price input");
    priceInput.value = "";

    const bonusNumberInput = document.querySelector("#bonus-lotto input");
    bonusNumberInput.value = "";
  }
  printError(errorMessage) {
    Console.print(`${errorMessage} 다시 입력해주세요.`);
  }
}

export default OutputView;
