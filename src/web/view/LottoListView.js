import { $ } from '../utils/dom';

const createQuantityParagraph = (lottos) => {
  const p = document.createElement('p');
  p.append(`총 ${lottos.length}개를 구매하였습니다.`);

  return p;
};

const createLottoItem = (lotto) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'lotto-item');
  li.append(lotto.join(', '));

  return li;
};

const createLottoList = (lottos) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'lotto-list-container');

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'lotto-list');

  const lottoItems = lottos.map((lotto) => createLottoItem(lotto));
  console.log(lottoItems);
  ul.append(...lottoItems);
  container.append(ul);

  return container;
};

const renderLottoListSection = (lottos) => {
  const lottoListSection = $('#purchase-lotto-list-section');

  resetLottoListSection();
  lottoListSection.append(...[createQuantityParagraph(lottos), createLottoList(lottos)]);
};

const resetLottoListSection = () => {
  $('#purchase-lotto-list-section').innerHTML = '';
};

export default renderLottoListSection;
