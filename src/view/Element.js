import Utils from "../util/Utils";
import LOTTO_SCORE from "../constants/LottoBoard";
import VIEW from "../constants/View";

const Element = {
  createBuyLottos(lotto, buyAmount, lottoAmount) {
    const lottoList = Utils.$(".lotto__numbers-list");
    const buyLottoTemplate = Utils.$("#lotto-tem");
    const buyLottoClone = document.importNode(buyLottoTemplate.content, true);

    this.createInnerText(
      buyLottoClone.querySelector(".lotto__lotto-icon"),
      "🎟"
    );
    this.createInnerText(
      buyLottoClone.querySelector(".lotto__numbers"),
      lotto.lottoNumbers
    );
    this.createInnerText(
      buyAmount,
      `총 ${lottoAmount}${VIEW.PRINT_LOTTO_AMOUNT}`
    );
    lottoList.appendChild(buyLottoClone);
  },

  createResults(lottoRanking, benefitRate) {
    this.createResultContainer();
    this.createResultTitle();
    for (const matchingCount in lottoRanking) {
      this.createResultContents(lottoRanking, matchingCount);
    }
    this.createRetryButton(benefitRate);
  },

  createResultContainer() {
    const resultBg = document.createElement("section");
    const resultContainer = document.createElement("div");

    this.addClassList(resultBg, "result-background");
    this.addClassList(resultContainer, "result-container");
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

    this.createInnerText(
      contentsClone.querySelector(".result__matching-count"),
      LOTTO_SCORE.UI_TEXT[matchingCount]
    );
    this.createInnerText(
      contentsClone.querySelector(".result__price"),
      LOTTO_SCORE.BENEFIT_TEXT[matchingCount]
    );
    this.createInnerText(
      contentsClone.querySelector(".result__matching-lotto-count"),
      `${lottoRanking[matchingCount]}개`
    );
    document.querySelector(".result-container").appendChild(contentsClone);
  },

  createRetryButton(benefitRate) {
    const retryTemplate = document.querySelector("#result-footer");
    const retryClone = document.importNode(retryTemplate.content, true);

    document.querySelector(".result-container").appendChild(retryClone);
    this.createInnerText(
      Utils.$(".result__comment"),
      `${VIEW.PRINT_BENEFIT_RATE_START} ${benefitRate}${VIEW.PRINT_BENEFIT_RATE_END}`
    );
  },

  createInnerText(element, text) {
    element.innerText = text;
  },

  removeClassList(element, className) {
    element.classList.remove(className);
  },

  addClassList(element, className) {
    element.classList.add(className);
  },
};

export default Element;
