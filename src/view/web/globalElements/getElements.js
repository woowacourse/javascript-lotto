export const getPrice = () => {
  return Number(document.querySelector("#price").value);
};

export const getLottoNumbers = () => {
  return [...document.querySelectorAll(".lotto-numbers")].map((li) =>
    li.textContent.split(",").map(Number),
  );
};

export const getWinningNumbers = () => {
  return [...document.querySelectorAll(".winning-numbers")].map((number) =>
    Number(number.value),
  );
};

export const getBonusNumber = () => {
  return Number(document.querySelector(".bonus-number").value);
};
