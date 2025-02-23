export const displayLotto = (lottoArray) => {
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

export const displayCount = (lottoCount) => {
  const countContainer = document.querySelector(".lotto-count");
  const countText = document.createElement("div");
  countText.classList.add("count");
  countText.textContent = `총 ${lottoCount} 개를 구매하였습니다.`;

  countContainer.appendChild(countText);
};

export const displayResultButton = () => {
  const resultButtonContainer = document.querySelector(".result-button-container");
  const resultButton = document.createElement("button");
  resultButton.classList.add("result-button");
  resultButton.textContent = "결과 확인하기";

  resultButtonContainer.appendChild(resultButton);
  return resultButtonContainer;
};
