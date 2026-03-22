import { createEl } from '../utils/dom.js';

export default class LottoList {
  #elements;

  mount(container) {
    const { section, count, items } = this.#createElement();
    this.#elements = { section, count, items };
    container.appendChild(section);
  }

  unmount() {
    this.#elements.section.remove();
  }

  render(lottos) {
    const { count, items } = this.#elements;
    count.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    const fragment = document.createDocumentFragment();
    lottos.forEach((numbers) => {
      fragment.appendChild(this.#createLottoItem(numbers));
    });
    items.replaceChildren(fragment);
  }

  #createLottoItem(numbers) {
    return createEl('li', { className: 'lotto-item' },
      createEl('span', { className: 'lotto-item__icon' }, '🎟️'),
      createEl('span', {}, numbers.join(', ')),
    );
  }

  #createElement() {
    const count = createEl('p', { className: 'lotto-list__count' });
    const items = createEl('ul', { className: 'lotto-list__items' });
    const section = createEl('div', { className: 'lotto-list' }, count, items);
    return { section, count, items };
  }
}
