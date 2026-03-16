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
    const item = document.createElement('li');
    item.className = 'lotto-item';

    const icon = document.createElement('span');
    icon.className = 'lotto-item__icon';
    icon.textContent = '🎟️';

    const numbersText = document.createElement('span');
    numbersText.textContent = numbers.join(', ');

    item.append(icon, numbersText);
    return item;
  }

  #createElement() {
    const section = document.createElement('div');
    section.className = 'lotto-list';

    const count = document.createElement('p');
    count.className = 'lotto-list__count';

    const items = document.createElement('ul');
    items.className = 'lotto-list__items';

    section.append(count, items);
    return { section, count, items };
  }
}
