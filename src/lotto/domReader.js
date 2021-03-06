export const getAllNumbers = ($$elements) => {
  return $$elements
    .filter(({ value }) => value !== '')
    .map(({ value }) => Number(value));
};
