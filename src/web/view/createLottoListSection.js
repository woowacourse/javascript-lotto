const createQuantityParagraph = (lottos) => `<p>총 ${lottos.length}개를 구매하였습니다.</p>`;

const createLottoItem = (lotto) => `<li class="lotto-item">${lotto.join(', ')}</li>`;

const createLottoList = (lottos) =>
  `<div class="lotto-list-container">
    <ul class="lotto-list">${lottos.map((lotto) => createLottoItem(lotto)).join('')}</ul>
  </div>`;

const createLottoListSection = (lottos) =>
  `<section class="lotto-game-section" id="purchase-lotto-list-section">
    ${createQuantityParagraph(lottos) + createLottoList(lottos)}
  </section>`;

export default createLottoListSection;
