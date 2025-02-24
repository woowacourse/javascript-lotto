const createLottoNumbers = (numbers, lottoIndex) => {
  const lottoNumbersLiteral = `
        <li class="lotto-numbers" id="lotto-numbers-${lottoIndex}">
          <span class="lotto-icon" id="lotto-icon-${lottoIndex}">🎟️</span>
          ${numbers.join(", ")}
        </li>
      `;

  return lottoNumbersLiteral;
};

export default createLottoNumbers;
