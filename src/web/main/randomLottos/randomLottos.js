import './randomLottos.css';

export default function randomLottos(playLotto, randomLottosArray) {
  const purchasedLottoQuantity = document.createElement('p');
  purchasedLottoQuantity.innerText = `총 ${randomLottosArray.length}개를 구매하였습니다.`;
  purchasedLottoQuantity.className = 'purchaesd-quantity';
  playLotto.appendChild(purchasedLottoQuantity);

  const randomLottos = document.createElement('div');
  randomLottos.className = 'random-lottos';

  console.log(randomLottosArray);

  randomLottosArray.forEach((randomLotto) => {
    const oneLotto = document.createElement('div');
    oneLotto.className = 'one-lotto';

    const lottoImage = document.createElement('img');
    lottoImage.src = './lotto.png';

    const randomLottoNumbers = document.createElement('p');
    randomLottoNumbers.innerText = randomLotto;

    oneLotto.appendChild(lottoImage);
    oneLotto.appendChild(randomLottoNumbers);
    randomLottos.appendChild(oneLotto);
  });

  playLotto.appendChild(randomLottos);
}
