import { validateLotto } from '../utils/validation.js';

export default class Lotto {
  constructor(numbers) {
    validateLotto(numbers);
  }
}
