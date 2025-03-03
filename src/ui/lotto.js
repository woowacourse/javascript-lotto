// 로또 구매 수량 요소 생성
export function createLottoCountElement(count) {
  const buy_count = document.createElement('p');
  buy_count.innerText = `총 ${count}개를 구매하였습니다.`;
  buy_count.classList.add('buy_count');
  return buy_count;
}

// 로또 컨테이너 생성
function createLottoContainer() {
  const lotto_container = document.createElement('section');
  lotto_container.classList.add('lotto_container');
  return lotto_container;
}

// 로또 구매 수량 UI 생성
export function paintLottoCount(lottos) {
  const main_container = document.getElementById('main_container');

  main_container.appendChild(createLottoCountElement(lottos.length));
  main_container.appendChild(createLottoContainer());
}

// 로또 번호 UI 생성
function createLottoBox(lotto) {
  const lotto_box = document.createElement('div');
  lotto_box.classList.add('lotto_box');

  const lotto_img = document.createElement('img');
  lotto_img.src = 'https://aydenote.github.io/javascript-lotto/public/img/lotto.png';
  lotto_img.alt = 'lotto image';

  const lotto_number = document.createElement('p');
  lotto_number.textContent = lotto.numbers.join(', ');

  lotto_box.appendChild(lotto_img);
  lotto_box.appendChild(lotto_number);
  return lotto_box;
}

// 로또 수량만큼 UI에 표시
export function paintLottos(lottos) {
  const lotto_container = document.querySelector('.lotto_container');
  lottos.forEach((lotto) => lotto_container.appendChild(createLottoBox(lotto)));
}
