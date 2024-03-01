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
