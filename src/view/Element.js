import Utils from "../util/Utils";
import LOTTO_SCORE from "../constants/LottoBoard";
import VIEW from "../constants/View";
import HandleView from "../util/HandleView";
import CLASS_NAME from "../constants/ClassName";

const Element = {
  createBuyLottos(lotto, buyAmount, lottoAmount) {
    const lottoList = HandleView.$(CLASS_NAME.LOTTO_NUMBER_LIST);
    const buyLottoTemplate = HandleView.$("#lotto-tem");
    const buyLottoClone = document.importNode(buyLottoTemplate.content, true);

    this.createInnerText(
      buyLottoClone.querySelector(CLASS_NAME.LOTTO_ICON),
      "🎟"
    );
    this.createInnerText(
      buyLottoClone.querySelector(CLASS_NAME.LOTTO_NUMBERS),
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

    HandleView.addClassList(resultBg, "result-background");
    HandleView.addClassList(resultContainer, "result-container");
    HandleView.$("#app").appendChild(resultBg);
    resultBg.appendChild(resultContainer);
  },

  createResultTitle() {
    const titleTemplate = HandleView.$(CLASS_NAME.RESULT_TITLE_ID);
    const titleClone = document.importNode(titleTemplate.content, true);

    HandleView.$(".result-container").appendChild(titleClone);
  },

  createResultContents(lottoRanking, matchingCount) {
    const contentsTemplate = HandleView.$(CLASS_NAME.RESULT_ID);
    const contentsClone = document.importNode(contentsTemplate.content, true);

    this.createInnerText(
      contentsClone.querySelector(CLASS_NAME.RESULT_MATCHING_COUNT),
      LOTTO_SCORE.UI_TEXT[matchingCount]
    );
    this.createInnerText(
      contentsClone.querySelector(CLASS_NAME.RESULT_PRICE),
      LOTTO_SCORE.BENEFIT_TEXT[matchingCount]
    );
    this.createInnerText(
      contentsClone.querySelector(CLASS_NAME.MATCHING_LOTTO_COUNT),
      `${lottoRanking[matchingCount]}개`
    );
    HandleView.$(".result-container").appendChild(contentsClone);
  },

  createRetryButton(benefitRate) {
    const retryTemplate = HandleView.$(CLASS_NAME.RESULT_FOOTER_ID);
    const retryClone = document.importNode(retryTemplate.content, true);

    HandleView.$(".result-container").appendChild(retryClone);

    this.createInnerText(
      HandleView.$(CLASS_NAME.RESULT_COMMENT),
      `${VIEW.PRINT_BENEFIT_RATE_START} ${benefitRate}${VIEW.PRINT_BENEFIT_RATE_END}`
    );
  },

  createInnerText(element, text) {
    element.innerText = text;
  },
};

export default Element;
