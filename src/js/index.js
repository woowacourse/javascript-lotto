import WebController from "../controller/WebController.js";
import LOTTO_SYSTEM from "../constants/lottoSystem.js";
import ElementTree from "./ElementTree.js";

const webController = new WebController();

const purchaseButton = document.getElementById("purchase-lotto");
const modalCloseButton = document.getElementById("modal-close-button");
const resetButton = document.getElementById("reset-game");
const modalElement = document.getElementById("lotto-result");
const appElement = document.getElementById("app");

const resetGame = () => {
  const showPurchaseLottosTag = document.getElementById(
    "purchased-lotto-lists",
  );
  showPurchaseLottosTag.innerHTML = "";
  const purchaseAmount = document.getElementById("amount");
  purchaseAmount.value = 0;
  closeModal();
};

const formatStatisticsResult = (ranking) => {
  const secondPlace = 2;

  const correctCount =
    ranking !== secondPlace
      ? LOTTO_SYSTEM.correctCount[ranking] + "개"
      : LOTTO_SYSTEM.correctCount[ranking] + "보너스 볼";
  const prize = LOTTO_SYSTEM.lottoPrize[ranking];

  return {
    correctCount,
    prize,
  };
};

const openModal = () => {
  modalElement.style.display = "block";
  appElement.style.backgroundColor = "rgba(0,0,0,0.5)";
};

const closeModal = () => {
  modalElement.style.display = "none";
  appElement.style.backgroundColor = "transparent";
  const statisticTable = document.getElementById("lotto-result-table");
  statisticTable.innerHTML = "";
};

const showPurchaseLottoCount = (lottos) => {
  const lottoListsElement = new ElementTree("div");

  const message = `총 ${lottos.length}개를 구매하였습니다.`;
  lottoListsElement.createNewTag("div", message);

  return lottoListsElement.tags.outerHTML;
};

const showLottoLists = (lottos) => {
  const lottoListsElement = new ElementTree("ul");
  lottos.forEach((lotto) => {
    lottoListsElement.generateTmpStack("li", "");
    lottoListsElement.pushTmpTag("div", "🎟️ ", { class: "ticket-icon" });
    lottoListsElement.pushTmpTag("div", lotto.numbers.join(", "));
    lottoListsElement.flushTmpTag();
  });

  return lottoListsElement.tags;
};

const showInputBonusNumber = () => {
  const bonusNumberElement = new ElementTree("div");
  bonusNumberElement.createNewTag(
    "h2",
    "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
  );

  bonusNumberElement.generateTmpStack("div", "", {
    class: "input-bonus-title",
  });
  bonusNumberElement.pushTmpTag("h2", "당첨 번호");
  bonusNumberElement.pushTmpTag("h2", "보너스 번호");
  bonusNumberElement.flushTmpTag();

  bonusNumberElement.generateTmpStack("div", "", {
    class: "input-bonusball-wrapper",
  });
  Array.from({ length: 6 }).forEach(() =>
    bonusNumberElement.pushTmpTag("input", "", {
      class: "input-winningnumber",
      type: "number",
      min: 1,
      max: 45,
    }),
  );

  bonusNumberElement.pushTmpTag("input", "", {
    class: "input-bonusnumber",
    type: "number",
  });
  bonusNumberElement.flushTmpTag();

  bonusNumberElement.createNewTag("button", "결과 확인하기", {
    class: "check-lotto-result",
    onClick: checkLottoResult,
  });

  return bonusNumberElement.tags;
};

const purchaseLotto = () => {
  const showPurchaseLottosTag = document.getElementById(
    "purchased-lotto-lists",
  );
  const purchaseAmount = document.getElementById("amount").value;
  const lottos = webController.purchaseLottos(Number(purchaseAmount));

  showPurchaseLottosTag.innerHTML = showPurchaseLottoCount(lottos);
  showPurchaseLottosTag.appendChild(showLottoLists(lottos));
  showPurchaseLottosTag.appendChild(showInputBonusNumber());
};

const showLottoRanking = (totalRanking) => {
  const statisticTable = document.getElementById("lotto-result-table");
  const rankingElement = new ElementTree("tbody");

  totalRanking
    .slice()
    .reverse()
    .forEach((value, index) => {
      const actualIndex = totalRanking.length - 1 - index;
      if (actualIndex === 0) return;
      const { correctCount, prize } = formatStatisticsResult(actualIndex);
      rankingElement.generateTmpStack("tr", "");
      rankingElement.pushTmpTag("td", correctCount);
      rankingElement.pushTmpTag("td", prize.toLocaleString());
      rankingElement.pushTmpTag("td", `${value}개`);
      rankingElement.flushTmpTag();
    });

  statisticTable.appendChild(rankingElement.tags);
};

const showLottoProfiteRate = (totalProfitRate) => {
  const profitValue = document.getElementById("profit-value");
  profitValue.innerText = totalProfitRate;
};

const checkLottoResult = () => {
  try {
    const winningNumbers = document.querySelectorAll(".input-winningnumber");
    const bonusNumber = document.querySelector(".input-bonusnumber");
    const winningNumbersValue = Object.values(winningNumbers).map((number) =>
      Number(number.value),
    );
    const bonusNumberValue = Number(bonusNumber.value);

    const { totalRanking, totalProfitRate } = webController.calculateProfitRate(
      winningNumbersValue,
      bonusNumberValue,
    );
    openModal();
    showLottoRanking(totalRanking);
    showLottoProfiteRate(totalProfitRate);
  } catch (error) {
    alert(error.message);
  }
};

purchaseButton.addEventListener("click", purchaseLotto);
modalCloseButton.addEventListener("click", closeModal);
resetButton.addEventListener("click", resetGame);
