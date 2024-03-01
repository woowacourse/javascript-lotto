import { ERROR_PREFIX } from '../../constants';
import { GAME_STEP } from '../constants/gameStep';

/**
 *
 * @param {Element} element
 * @param {Error|undefined} error
 */
// eslint-disable-next-line
export const handleErrorMessage = (element, error) => {
  const text = error ? error.message.replace(ERROR_PREFIX, '') : '';
  // eslint-disable-next-line
  element.textContent = text;
};

/**
 * @param {"payment"|"winning"|"statistics"} step
 */
export const changeClassAboutGameStep = (step) => {
  const appInnerElement = document.querySelector('#app .inner');

  appInnerElement.className = `inner ${GAME_STEP[step]}`;
};

/**
 * 구매 금액이 달라졌거나, 게임을 초기화 할때 구매금액을 제외한 나머지들을 초기 상태로 돌리는 로직
 */
export const recoveryInitialStateExceptPayment = () => {
  if (
    !document.querySelector('#app .inner').classList.contains(GAME_STEP.payment)
  ) {
    changeClassAboutGameStep('payment');
    document.querySelector('.winning-criteria__form')?.reset();
  }
};
