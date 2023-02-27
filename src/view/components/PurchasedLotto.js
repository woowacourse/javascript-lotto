const PurchasedLottoTemplate = (lotto) => {
  return `
        <p>🎟️ ${lotto.getNumbers().join(', ')}<p>
    `;
};

module.exports = PurchasedLottoTemplate;
