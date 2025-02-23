import { LOTTO_NUMBERS } from "./lottoConstants/systemConstants.js";
import { getLottoArray, getLottoCount } from "./service/PurchaseService.js";

const runLotto = () => {
  document.querySelector(".purchase-button").addEventListener("click", () => {
    const inputPrice = document.querySelector(".price-input").value;

    const lottoCount = getLottoCount(inputPrice);
    displayCount(lottoCount);

    const lottoArray = getLottoArray(lottoCount);
    displayLotto(lottoArray);
    displayWinning();
    displayResultButton();
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
  const countText = document.createElement("div");
  countText.classList.add("count");
  countText.textContent = `총 ${lottoCount} 개를 구매하였습니다.`;

  countContainer.appendChild(countText);
};

const displayWinning = () => {
  const winningContainer = document.querySelector(".winning-numbers");
  const winningInputContainer = document.querySelector(".winning-bonus-container");

  const winningPrompt = document.createElement("div");
  winningPrompt.classList.add("winning-prompt");
  winningPrompt.textContent = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LEGNTH}개를 입력해주세요.`;

  winningContainer.appendChild(winningPrompt);
  winningInputContainer.appendChild(displayWinningInput());
  winningInputContainer.appendChild(displayBonusInput());
  winningContainer.appendChild(winningInputContainer);
};

const displayWinningInput = () => {
  const winningInputWrap = document.querySelector(".winning-input-wrap");
  const winningInputContainer = document.createElement("div");
  winningInputContainer.classList.add("winning-input-container");

  const winningInputLabel = document.createElement("div");
  winningInputLabel.textContent = "당첨 번호";

  winningInputWrap.appendChild(winningInputLabel);

  for (let i = 0; i < LOTTO_NUMBERS.LENGTH; i++) {
    const winningInput = document.createElement("input");
    winningInput.min = LOTTO_NUMBERS.MIN;
    winningInput.max = LOTTO_NUMBERS.MAX;
    winningInput.classList.add("winning-input");
    winningInputContainer.appendChild(winningInput);
  }

  winningInputWrap.appendChild(winningInputContainer);
  return winningInputWrap;
};

const displayBonusInput = () => {
  const bonusInputWrap = document.querySelector(".bonus-input-wrap");
  const bonusInputContainer = document.createElement("div");
  bonusInputContainer.classList.add("bonus-input-container");

  const bonusInputLabel = document.createElement("div");
  bonusInputLabel.textContent = "보너스 번호";
  bonusInputContainer.appendChild(bonusInputLabel);

  const bonusInput = document.createElement("input");
  bonusInput.min = LOTTO_NUMBERS.MIN;
  bonusInput.max = LOTTO_NUMBERS.MAX;
  bonusInput.step = "1";
  bonusInput.type = "number";
  bonusInput.classList.add("winning-input");
  bonusInputContainer.appendChild(bonusInput);

  bonusInputWrap.appendChild(bonusInputContainer);

  return bonusInputWrap;
};

const displayResultButton = () => {
  const resultButtonContainer = document.querySelector(".result-button-container");
  const resultButton = document.createElement("button");
  resultButton.classList.add("result-button");
  resultButton.textContent = "결과 확인하기";

  resultButtonContainer.appendChild(resultButton);
  return resultButtonContainer;
};

runLotto();
