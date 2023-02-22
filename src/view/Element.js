import Utils from "../util/Utils";
import LOTTO_BOARD from "../constants/LottoBoard";

const Element = {
  createBuyLottos(lotto) {
    const lottoList = Utils.$(".lotto__numbers-list");
    const buyLottoTemplate = Utils.$("#lotto-tem");
    const buyLottoClone = document.importNode(buyLottoTemplate.content, true);
    buyLottoClone.querySelector(".lotto__lotto-icon").innerText = "🎟";
    buyLottoClone.querySelector(".lotto__numbers").innerText =
      lotto.lottoNumbers;
    lottoList.appendChild(buyLottoClone);
  },

  createResults(lottoRanking) {
    this.createResultContainer();
    this.createResultTitle();
    for (const matchingCount in lottoRanking) {
      this.createResultContents(lottoRanking, matchingCount);
    }
    this.createRetryButton();
  },

  createResultContainer() {
    const resultBg = document.createElement("section");
    const resultContainer = document.createElement("div");
    resultBg.classList.add("result-background");
    resultContainer.classList.add("result-container");
    Utils.$("#app").appendChild(resultBg);
    resultBg.appendChild(resultContainer);
  },

  createResultTitle() {
    const titleTemplate = Utils.$("#result-title");
    const titleClone = document.importNode(titleTemplate.content, true);
    document.querySelector(".result-container").appendChild(titleClone);
  },

  createResultContents(lottoRanking, matchingCount) {
    const contentsTemplate = Utils.$("#result");
    const contentsClone = document.importNode(contentsTemplate.content, true);
    contentsClone.querySelector(".result__matching-count").innerText =
      matchingCount;
    contentsClone.querySelector(".result__price").innerText =
      LOTTO_BOARD.moneyBoard[matchingCount];
    contentsClone.querySelector(".result__matching-lotto-count").innerText =
      lottoRanking[matchingCount];
    document.querySelector(".result-container").appendChild(contentsClone);
  },

  createRetryButton() {
    const retryTemplate = document.querySelector("#result-footer");
    const retryClone = document.importNode(retryTemplate.content, true);
    document.querySelector(".result-container").appendChild(retryClone);
  },
};

export default Element;
