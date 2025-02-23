import { getLottoArray, getLottoCount } from "./service/PurchaseService.js";

const runLotto = () => {
  document.querySelector(".purchase-button").addEventListener("click", () => {
    const inputPrice = document.querySelector(".price-input").value;
    console.log("입력된 값:", inputPrice);

    const lottoCount = getLottoCount(inputPrice);
    displayCount(lottoCount);

    const lottoArray = getLottoArray(lottoCount);
    displayLotto(lottoArray);
  });
};

const displayLotto = (lottoArray) => {
  const lottoContainer = document.querySelector(".lotto-numbers-container");

  lottoArray.forEach((lotto) => {
    const lottoNumbersItem = document.createElement("div");
    lottoNumbersItem.classList.add("lotto-numbers-item");

    const lottoItem = document.createElement("div");
    lottoItem.classList.add("lotto-numbers");
    lottoItem.textContent = lotto.numbers.join(", ");

    const lottoImage = document.createElement("img");
    lottoImage.classList.add("lotto-image");
    lottoImage.src = "public/lotto.png";
    lottoImage.alt = "로또 이미지";

    lottoNumbersItem.appendChild(lottoImage);
    lottoNumbersItem.appendChild(lottoItem);
    lottoContainer.appendChild(lottoNumbersItem);
  });
};

const displayCount = (lottoCount) => {
  const countContainer = document.querySelector(".lotto-count");
  const countItem = document.createElement("div");
  countItem.classList.add("count");
  countItem.textContent = `총 ${lottoCount} 개를 구매하였습니다.`;

  countContainer.appendChild(countItem);
};

runLotto();
