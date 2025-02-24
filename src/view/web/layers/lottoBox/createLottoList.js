import createLotto from "./createLotto.js";

const createLottoList = (lottoNumbers) => {
  const lottoListLiteral = `
    <ul class="lotto-list">
      ${lottoNumbers.map((numbers, index) => createLotto(numbers, index)).join("")}
    </ul>
  `;

  document.getElementById("lotto-container").innerHTML += lottoListLiteral;
};

export default createLottoList;
