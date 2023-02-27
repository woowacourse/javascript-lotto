const lottoTemplate = (numbers) => {
  return `<div class="lotto-item">
  <span>🎟️</span>
  <span>${numbers.join(', ')}</span>
  </div>`;
};

export default lottoTemplate;
