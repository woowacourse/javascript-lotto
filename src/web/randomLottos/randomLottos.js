import { createElement } from '../utils/dom';
import './randomLottos.css';

export default function randomLottos(playLotto, randomLottosArray) {
  const purchasedLottoQuantity = createElement('span', {
    class: 'purchaesd-quantity',
    textContent: `총 ${randomLottosArray.length}개를 구매하였습니다.`,
  });
  playLotto.appendChild(purchasedLottoQuantity);

  const randomLottos = createElement('div', { class: 'random-lottos' });
  CreateOneLotto(randomLottos, randomLottosArray);

  playLotto.appendChild(randomLottos);
}

function CreateOneLotto(randomLottos, randomLottosArray) {
  randomLottosArray.forEach((randomLotto) => {
    const oneLotto = createElement('div', { class: 'one-lotto' });
    const lottoImage = createElement('img', { src: './lotto.png' });
    const randomLottoNumbers = createElement('span', { textContent: randomLotto });

    oneLotto.appendChild(lottoImage);
    oneLotto.appendChild(randomLottoNumbers);
    randomLottos.appendChild(oneLotto);
  });
}
