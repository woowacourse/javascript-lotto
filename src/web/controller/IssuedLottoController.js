import getRandomLottoArray from "../../domain/getRandomLottoArray.js";
import { SYMBOL } from "../constants/viewMessage.js";

class IssuedLottoController {
  #issuedLottos = [];

  constructor(count) {
    this.#issuedLottos = getRandomLottoArray(count);
  }

  #createLottoNumbersP(lottoNumbers) {
    const lottoNumbersSpan = document.createElement("span");
    lottoNumbersSpan.classList.add("issued-lotto-numbers-span");
    lottoNumbersSpan.textContent = `${SYMBOL.LOTTO_EMOJI} ${[
      ...lottoNumbers,
    ].join(SYMBOL.LOTTO_NUMBER_DELIMITER)}`;

    return lottoNumbersSpan;
  }

  #createLottoEl(lottoNumbers) {
    const lottoDiv = document.createElement("div");
    lottoDiv.classList.add("issued-lotto");

    const lottoNumbersSpan = this.#createLottoNumbersP(lottoNumbers);
    lottoDiv.appendChild(lottoNumbersSpan);

    return lottoDiv;
  }

  printIssuedLottoDiv() {
    const afterBuySec = document.querySelector("#after-buy-section");

    const issuedLottoDiv = document.createElement("div");
    issuedLottoDiv.id = "issued-lotto-div";
    afterBuySec.appendChild(issuedLottoDiv);

    this.#printIssuedLottos(issuedLottoDiv);
  }

  #printIssuedLottos(issuedLottoDiv) {
    const fragment = document.createDocumentFragment();

    this.#issuedLottos.forEach((lottoNumbers) => {
      const lottoEl = this.#createLottoEl(lottoNumbers);
      fragment.appendChild(lottoEl);
    });

    issuedLottoDiv.appendChild(fragment);
  }

  getIssuedLottos() {
    return [...this.#issuedLottos];
  }
}

export default IssuedLottoController;
