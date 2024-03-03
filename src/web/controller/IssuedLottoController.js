import getRandomLottoArray from "../../domain/getRandomLottoArray.js";
import { SYMBOL } from "../constants/viewMessage.js";

class IssuedLottoController {
  #issuedLottos = [];

  constructor(count) {
    this.#issuedLottos = getRandomLottoArray(count);
    this.#printIssuedLottoDiv();
  }

  #createLottoEmojiSpan() {
    const lottoEmojiSpan = document.createElement("span");
    lottoEmojiSpan.classList.add("lotto-emoji-span");
    lottoEmojiSpan.textContent = SYMBOL.LOTTO_EMOJI;

    return lottoEmojiSpan;
  }

  #createLottoNumbersSpan(lottoNumbers) {
    const lottoNumbersSpan = document.createElement("span");
    lottoNumbersSpan.classList.add("issued-lotto-numbers-span");
    lottoNumbersSpan.textContent = [...lottoNumbers].join(
      SYMBOL.LOTTO_NUMBER_DELIMITER
    );

    return lottoNumbersSpan;
  }

  #createLottoEl(lottoNumbers) {
    const lottoDiv = document.createElement("div");
    lottoDiv.classList.add("issued-lotto");

    const lottoEmojiSpan = this.#createLottoEmojiSpan();
    lottoDiv.appendChild(lottoEmojiSpan);

    const lottoNumbersSpan = this.#createLottoNumbersSpan(lottoNumbers);
    lottoDiv.appendChild(lottoNumbersSpan);

    return lottoDiv;
  }

  #printIssuedLottoDiv() {
    const afterBuySec = document.querySelector("#after-buy-section");

    const issuedLottoDiv = document.createElement("div");
    issuedLottoDiv.id = "issued-lotto-div";
    afterBuySec.appendChild(issuedLottoDiv);

    this.#printIssuedLottos();
  }

  #printIssuedLottos() {
    const issuedLottoDiv = document.querySelector("#issued-lotto-div");

    this.#issuedLottos.forEach((lottoNumbers) => {
      const lottoEl = this.#createLottoEl(lottoNumbers);
      issuedLottoDiv.appendChild(lottoEl);
    });
  }

  getIssuedLottos() {
    return [...this.#issuedLottos];
  }
}

export default IssuedLottoController;
