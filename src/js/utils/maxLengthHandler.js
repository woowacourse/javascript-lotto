const LOTTO_NUMBER_MAX_LENGTH = 2;

export const maxLengthHandler = event => {
  if (event.target.value.length > LOTTO_NUMBER_MAX_LENGTH) {
    event.target.value = event.target.value.slice(0, LOTTO_NUMBER_MAX_LENGTH);
  }
};
