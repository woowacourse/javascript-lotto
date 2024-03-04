import WinningLottoForm from "../web/WinningLottoForm.js";

export const printLottos = (lottos) => {
  const $lottosCount = document.getElementById("lottosCount");
  const $lottosUl = document.getElementById("lottosUl");
  if ($lottosUl.firstChild) {
    $lottosCount.innerText = ``;
    $lottosUl.replaceChildren();
  }
  const $lottoElements = lottos.map((lotto) => {
    const $lottoLi = document.createElement("li");
    $lottoLi.innerText = `🎟️ ${lotto
      .getNumbers()
      .sort((a, b) => a - b)
      .join(", ")}`;
    return $lottoLi;
  });
  $lottosUl.append(...$lottoElements);
  $lottosCount.innerText = `총 ${lottos.length}개를 구매하였습니다.`;

  document.getElementById("lottosBox").classList.remove("hidden");
  WinningLottoForm.show();
};

export const removeLottos = () => {
  const $lottosCount = document.getElementById("lottosCount");
  const $lottosUl = document.getElementById("lottosUl");
  $lottosCount.innerText = ``;
  $lottosUl.replaceChildren();
  document.getElementById("lottosBox").classList.add("hidden");
};

export const printResultTable = (results) => {
  const resultTable = document.getElementById("resultTable");
  resultTable.append(...results.reverse());
};

export const printReturnRate = (returnRate) => {
  const $returnRate = document.getElementById("returnRate");
  $returnRate.innerText = `당신의 총 수익률은 ${returnRate}% 입니다.`;
};

export const printErrorMessage = ({ location, errorMessage }) => {
  location.innerText = errorMessage;
};

export const removeErrorMessage = ({ location }) => {
  location.innerText = "";
};
