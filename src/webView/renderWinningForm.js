import { createDomWith, appendDomByList, $, all$ } from './domUtils.js';
import { renderResult } from './renderResult.js';

const submitHandler = (lottoGame) => (event) => {
  event.preventDefault();
  try {
    const winningNumbers = Array.from(all$('#winning-numbers>input')).map((elem) =>
      Number(elem.value)
    );
    const bonusNumber = Number($('#bonus-number>input').value);
    const resultBoard = lottoGame.setWinningLotto(winningNumbers, bonusNumber).getGameResult();
    renderResult(resultBoard);
  } catch (error) {
    alert(error);
  }
};

export const renderWinningForm = (lottoGame) => {
  const $winningSection = createDomWith('section')({ id: 'winning-lotto' });

  const $message = createDomWith('p')({
    class: 'message',
    innerText: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  });

  const $form = document.createElement('form');
  const $spanContainer = createDomWith('div')({ id: 'number-message', class: 'message' });

  const $winningSpan = createDomWith('span')({ innerText: '당첨 번호' });
  const $bonusSpan = createDomWith('span')({ innerText: '보너스 번호' });
  $spanContainer.append($winningSpan, $bonusSpan);

  const $lottoContainer = createDomWith('div')({ id: 'number-box' });
  const $lottoWinningContainer = createDomWith('div')({ id: 'winning-numbers' });

  appendDomByList($lottoWinningContainer)(Array.from({ length: 6 }))((elem) =>
    createDomWith('input')({ type: 'text', minlength: '1', maxlength: '2' })
  );

  const $lottoBonusContainer = createDomWith('div')({ id: 'bonus-number' });

  const $bonusInput = createDomWith('input')({ type: 'text' });
  $lottoBonusContainer.appendChild($bonusInput);

  const $submitButton = createDomWith('button')({
    id: 'result-button',
    type: 'submit',
    innerText: '결과 확인하기',
  });

  $lottoContainer.append($lottoWinningContainer, $lottoBonusContainer);
  $form.append($spanContainer, $lottoContainer, $submitButton);
  $winningSection.append($message, $form);
  $('.app').append($winningSection);

  $('#purchasing-button').disabled = 'disabled';

  $submitButton.addEventListener('click', submitHandler(lottoGame));
};
