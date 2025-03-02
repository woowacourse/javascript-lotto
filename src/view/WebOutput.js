import DEFINITION, { RANK } from "../constant/Definition.js";
import { OUTPUT_MESSAGE } from "../constant/Message.js";

const WebOutput = {
  print(message) {
    console.log(message);
  },
  getHTML: (e) => document.getElementById(e),
  printLottos(lottos) {
    this.lottoAmount(lottos.length);
    // lottos.forEach((lotto) => {
    //   this.lottoNumbers(lotto);
    // });
    this.renderLottoNumbers(lottos);
  },

  lottoAmount(lottoAmount) {
    document.querySelector(".result-container p").textContent =
      OUTPUT_MESSAGE.LOTTO_AMOUNT(lottoAmount);
  },

  lottoNumbers(lottoNumbers) {
    const copyLottoNumbers = [...lottoNumbers];
    copyLottoNumbers.sort((a, b) => a - b);
    this.print(`${copyLottoNumbers.join(DEFINITION.SPLIT)}`);
  },

  renderLottoNumbers(lottos) {
    const resultContainer = document.querySelector(".lotto-results-box");

    let ul = document.createElement("ul");
    resultContainer.appendChild(ul);

    lottos.forEach((lotto, index) => {
      if (index % 7 === 0 && index !== 0) {
        ul = document.createElement("ul");
        resultContainer.appendChild(ul);
      }

      const li = document.createElement("li");
      li.classList.add("lotto-li");
      li.dataset.action = "copyContent";
      li.innerHTML = `<span>🎟️</span><p>${lotto.sort((a, b) => a - b).join(", ")}</p>`;
      ul.appendChild(li);
    });
  },

  winningStatistics() {
    this.print(OUTPUT_MESSAGE.WINNING_STATISTICS);
    this.print(OUTPUT_MESSAGE.BOUNDARY);
  },

  newLine() {
    this.print(DEFINITION.EMPTY);
  },

  matchResult(rank, amount) {
    const idList = {
      "5등": "fifthRank",
      "4등": "fourthRank",
      "3등": "thirdRank",
      "2등": "secondRank",
      "1등": "firstRank",
    };
    console.log("rank => ", typeof rank);
    this.getHTML(idList[rank]).textContent = amount;
  },

  winningRate(rate) {
    this.getHTML("winningRate").textContent = OUTPUT_MESSAGE.WINNING_RATE(rate);
  },

  printErrorResults(errorResults, errorName) {
    Object.entries(errorResults).forEach(([key, value]) => {
      if (value) {
        this.getHTML(`${errorName["ELEMENT_ID"]}`).appendChild(
          document.createElement("li"),
        ).textContent = `${errorName["MESSAGE"][key]}`;
        this.getHTML(`${errorName["ELEMENT_ID"]}`).classList.add("show");
      }
      if (!value)
        this.getHTML(`${errorName["ELEMENT_ID"]}`).classList.remove("show");
    });
  },
};

export default WebOutput;
