import createLottoNumbers from "./createLottoNumbers.js";

const createLottoNumbersList = (lottoNumbers) => {
  const lottoNumbersListLiteral = `
    <ul class="lotto-list">
      ${lottoNumbers.map((numbers, index) => createLottoNumbers(numbers, index)).join("")}
    </ul>
  `;

  document.getElementById("lotto-container").innerHTML +=
    lottoNumbersListLiteral;
};

export default createLottoNumbersList;
