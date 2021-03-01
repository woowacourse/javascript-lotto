export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getInputNumbers = $inputs => {
  return $inputs //
    .filter($input => $input.value !== '')
    .map($input => Number($input.value));
};
