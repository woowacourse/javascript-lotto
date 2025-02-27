const createLotto = (numbers) => {
  const lottoLiteral = `
        <li class="lotto-numbers">
          <span class="lotto-icon">🎟️</span>
          ${numbers.join(", ")}
        </li>
      `;

  return lottoLiteral;
};

export default createLotto;
