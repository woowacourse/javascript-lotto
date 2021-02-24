import { $correctNumberWrapper } from '../elements.js';
import { $ } from '../utils/querySelector.js';

export const getCorrectNumbers = () => {
  return $('.correct-number', $correctNumberWrapper)
    .filter(({ value }) => value !== '')
    .map(({ value }) => Number(value));
};
