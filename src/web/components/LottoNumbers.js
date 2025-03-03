export const LottoNumbers = ({ lottoArray }) => {
  const fragment = document.createDocumentFragment();

  lottoArray.forEach((lotto) => {
    fragment.appendChild(LottoNumber({ lotto: lotto }));
  });

  return fragment;
};

const LottoNumber = ({ lotto }) => {
  const lottoNumbersItem = document.createElement("div");
  lottoNumbersItem.classList.add("lotto-numbers-item");

  const lottoItem = document.createElement("div");
  lottoItem.classList.add("lotto-numbers");
  lottoItem.textContent = lotto.numbers.join(", ");

  const lottoImage = document.createElement("img");
  lottoImage.classList.add("lotto-image");
  lottoImage.src = `./lotto.png`;
  lottoImage.alt = "로또 이미지";

  lottoNumbersItem.appendChild(lottoImage);
  lottoNumbersItem.appendChild(lottoItem);

  return lottoNumbersItem;
};
