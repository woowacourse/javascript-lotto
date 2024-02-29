import "../style.css";

const initBody = () => {
  preventDefaults(document.getElementsByTagName("button"), "click");
  // grantHiddenVisibilityClass(
  //   document.getElementById("main-contents__purchased-lotto-span")
  // );
  // grantHiddenVisibilityClass(
  //   document.getElementById("main-contents__purchased-lotto-box")
  // );
  grantHiddenVisibilityClass(
    document.getElementById("main-contents__winning-lotto-form")
  );
  grantHiddenVisibilityClass(document.getElementById("modal"));
};

const grantHiddenVisibilityClass = (element) => {
  element.classList.add("visibility-hidden");
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

  document.getElementById("main-contents__price-input").value = "";
  deactivatePriceButton(event.target);
  console.log(document.getElementById("main-contents__price-input").value);
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

const printBoughtLottos = (lottos, numberOfLotto) => {
  printPurchasedLottoSpan(numberOfLotto);
  const lottoNumberElements = lottos.map((lotto) =>
    getPurchasedLottoElement(lotto)
  );

  document.getElementById("main-contents__purchased-lotto-box").innerHTML = "";

  document
    .getElementById("main-contents__purchased-lotto-box")
    .append(...lottoNumberElements);
};

const printPurchasedLottoSpan = (numberOfLotto) => {
  const purchasedLottoSpan = document.getElementById(
    "main-contents__purchased-lotto-span"
  );
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
  printBoughtLottos(lottos, originalNumberOfLotto);
  document
    .getElementById("main-contents__purchased-lotto-box")
    .append(
      getPurchasedLottoElement([
        `기타 ${originalNumberOfLotto - lottos.length}개의 로또...`,
      ])
    );
};

initBody();
// activatePriceButton();
// printBoughtSlicedLottos(new Array(100).fill([1, 2, 3, 4, 5, 6]), 10000);
