import { $$correctNumberInputs } from '../elements.js';

export const getCorrectNumbers = () => {
  return $$correctNumberInputs
    .filter(({ value }) => value !== '')
    .map(({ value }) => Number(value));
};
