import "../style.css";

const initBody = () => {
  preventDefaults(document.getElementsByTagName("button"), "click");
  grantHiddenVisibilityClass(
    document.getElementById("main-contents__purchased-lotto-span")
  );
  grantHiddenVisibilityClass(
    document.getElementById("main-contents__purchased-lotto-box")
  );
  grantHiddenVisibilityClass(
    document.getElementById("main-contents__winning-lotto-form")
  );
  grantHiddenVisibilityClass(document.getElementById("modal"));
};

const grantHiddenVisibilityClass = (element) => {
  element.classList.add("visibility-hidden");
};

const removeHiddenVisibilityClass = (element) => {
  element.classList.remove("visibility-hidden");
};

const deactivateButtonClass = (element) => {
  element.classList.add("unavailable_button");
  element.classList.remove("available_button");
};

const activateButtonClass = (element) => {
  element.classList.add("available_button");
  element.classList.remove("unavailable_button");
};

const preventDefaults = (elements, eventType) =>
  Array.from(elements).forEach((element) => {
    deactivateButtonClass(element);
    element.addEventListener(eventType, preventDefault);
  });

const preventDefault = (event) => {
  event.preventDefault();
};

const priceButtonClickEvent = (event) => {
  preventDefault(event);
  deactivateButtonClass(event.target);

  console.log(document.getElementById("main-contents__price-input").value);
  document.getElementById("main-contents__price-input").value = "";
  deactivatePriceButton(event.target);
};

const activatePriceButton = () => {
  const priceButton = document.getElementById("main-contents__price-button");
  activateButtonClass(priceButton);
  priceButton.removeEventListener("click", preventDefault);

  priceButton.addEventListener("click", priceButtonClickEvent);
};

const deactivatePriceButton = (element) => {
  deactivateButtonClass(element);
  element.removeEventListener("click", priceButtonClickEvent);
  element.addEventListener("click", preventDefault);
};
// print lottos

const printBoughtLottos = (lottos) => {
  const lottoNumberElements = lottos.map((lotto) =>
    getPurchasedLottoElement(lotto)
  );

  const purchasedLottobox = document.getElementById(
    "main-contents__purchased-lotto-box"
  );

  removeHiddenVisibilityClass(purchasedLottobox);
  purchasedLottobox.innerHTML = "";

  purchasedLottobox.append(...lottoNumberElements);
};

const printNumberOfLotto = (numberOfLotto) => {
  const purchasedLottoSpan = document.getElementById(
    "main-contents__purchased-lotto-span"
  );

  removeHiddenVisibilityClass(purchasedLottoSpan);
  purchasedLottoSpan.innerHTML = "";
  purchasedLottoSpan.innerHTML = `총 ${numberOfLotto}개를 구매하였습니다.`;
};

const getPurchasedLottoElement = (lotto) => {
  const purchasedLottoElement = document.createElement("div");
  purchasedLottoElement.classList.add("purchased-lotto");
  purchasedLottoElement.appendChild(getLottoTicketStrong());
  purchasedLottoElement.appendChild(getLottoNumberSpan(lotto));
  return purchasedLottoElement;
};

const getLottoTicketStrong = () => {
  const lottoTicketStrong = document.createElement("strong");
  lottoTicketStrong.innerHTML = "🎟️";
  lottoTicketStrong.classList.add("lotto-ticket");
  return lottoTicketStrong;
};

const getLottoNumberSpan = (lotto) => {
  const lottoNumberSpan = document.createElement("span");
  lottoNumberSpan.innerHTML = lotto.sort((a, b) => a - b).join(", ");
  lottoNumberSpan.classList.add("lotto-number");
  return lottoNumberSpan;
};

const printBoughtSlicedLottos = (lottos, originalNumberOfLotto) => {
  printBoughtLottos(lottos);
  document
    .getElementById("main-contents__purchased-lotto-box")
    .append(
      getPurchasedLottoElement([
        `기타 ${originalNumberOfLotto - lottos.length}개의 로또...`,
      ])
    );
};

// activateWinningLottoForm

const activateWinningLottoForm = () => {
  const winningLottoForm = document.getElementById(
    "main-contents__winning-lotto-form"
  );
  const winningLottoButton = document.getElementById(
    "main-contents__winning-lotto-button"
  );
  removeHiddenVisibilityClass(winningLottoForm);
  activateButtonClass(winningLottoButton);

  winningLottoButton.removeEventListener("click", preventDefault);

  winningLottoButton.addEventListener("click", winningLottoButtonClickEvent);
};

const winningLottoButtonClickEvent = (event) => {
  preventDefault(event);
  deactivateButtonClass(event.target);

  const winningNumbersAndBonus = Array.from(
    document.getElementsByClassName("winning-number-input")
  );

  winningNumbersAndBonus.forEach((element) => {
    console.log(element.value);
    element.value = "";
  });

  deactivateWinningLottoButton(event.target);
};
const deactivateWinningLottoButton = (element) => {
  deactivateButtonClass(element);
  element.removeEventListener("click", winningLottoButtonClickEvent);
  element.addEventListener("click", preventDefault);
};

const printLottoResultIntro = () => {
  removeHiddenVisibilityClass(document.getElementById("modal"));
};
const printLottoResult = (rankCounts, profitRate) => {
  const transformIndexToRank = (index) => 5 - index;
  const rankCountElements = Array.from(
    document.getElementsByClassName("rank-count")
  );
  rankCountElements.forEach(
    (element, index) =>
      (element.innerText = `${rankCounts[transformIndexToRank(index)]}개`)
  );
  printLottoProfitRate(profitRate);
};

const printLottoProfitRate = (profitRate) => {
  const resultSpan = document.getElementById("modal__result-span");
  resultSpan.innerText = `당신의 총 수익률은 ${profitRate.toFixed(1)}%입니다.`;
};

initBody();
activatePriceButton();
// printNumberOfLotto(10000);
// printBoughtSlicedLottos(new Array(100).fill([1, 2, 3, 4, 5, 6]), 10000);
// activateWinningLottoForm();
// printLottoResultIntro();
// printLottoResult([0, 0, 0, 0, 0, 0], 10);
