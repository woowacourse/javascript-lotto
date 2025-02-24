const createLottoNumbersList = (lottoNumbers) => {
  const lottoListHTML = `
    <ul class="lotto-list">
      ${lottoNumbers
        .map(
          (numbers, index) => `
        <li class="lotto-numbers" id="lotto-numbers-${index}">
          <span class="lotto-icon" id="lotto-icon-${index}">🎟️</span>
          ${numbers.join(", ")}
        </li>
      `,
        )
        .join("")}
    </ul>
  `;

  document.getElementById("lotto-container").innerHTML += lottoListHTML;
};

export default createLottoNumbersList;
