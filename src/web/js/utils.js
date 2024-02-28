import { ERROR_PREFIX } from '../../constants';

export const handleErrorMessage = (el, error) => {
  const text = error ? error.message.replace(ERROR_PREFIX, '') : '';

  el.textContent = text;
};
