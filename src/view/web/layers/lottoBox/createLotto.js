const createLotto = (numbers, lottoIndex) => {
  const lottoLiteral = `
        <li class="lotto-numbers" id="lotto-numbers-${lottoIndex}">
          <span class="lotto-icon" id="lotto-icon-${lottoIndex}">🎟️</span>
          ${numbers.join(", ")}
        </li>
      `;

  return lottoLiteral;
};

export default createLotto;
