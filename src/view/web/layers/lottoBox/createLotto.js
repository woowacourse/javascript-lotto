const createLotto = (numbers) => {
  const lottoLiteral = `
        <li class="lotto-numbers">
          <span class="lotto-icon">🎟️</span>
          <p class="lotto-number">${numbers.join(", ")}</p>
        </li>
      `;

  return lottoLiteral;
};

export default createLotto;
