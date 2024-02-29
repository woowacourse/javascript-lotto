import { ERROR_PREFIX } from '../../constants';

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
