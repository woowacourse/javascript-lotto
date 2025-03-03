/* eslint-disable no-alert */

import normalizeErrorMessage from './normalizeErrorMessage';

export default function catchError(validate) {
  try {
    validate();
    return false;
  } catch (error) {
    alert(normalizeErrorMessage(error.message));
    return true;
  }
}
