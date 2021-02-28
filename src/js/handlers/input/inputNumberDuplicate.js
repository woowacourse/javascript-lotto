import { hasDuplicate } from '../../lib/utils/validation.js';
import { DUPLICATE_INPUT_NUMBER } from '../../lib/constants/alertMessage.js';

const inputNumberDuplicateHandler = ({ target }) => {
  const sliceRange = { begin: 1, end: 7 };
  let inputArray = [...target.parentElement.children];

  if (target.parentElement.children.length !== 7) {
    sliceRange.begin = 0;
    inputArray = [...target.form];
  }

  const isUniqueNumber = inputArray
    .slice(sliceRange.begin, sliceRange.end)
    .map(child => {
      if (child.value !== '') {
        return child.value;
      }
    })
    .filter(child => child !== undefined);

  if (hasDuplicate(isUniqueNumber)) {
    target.value = '';
    target.focus();
    alert(DUPLICATE_INPUT_NUMBER);
  }
};

export default inputNumberDuplicateHandler;
