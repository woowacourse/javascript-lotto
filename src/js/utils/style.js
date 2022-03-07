/* eslint-disable no-param-reassign */
/* eslint-disable max-depth */

export const changeOkInputsColor = (list, $$inputs) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = i + 1; j < 7; j += 1) {
      if (list[i] !== list[j]) {
        $$inputs[i].className = 'ok-input';
        $$inputs[j].className = 'ok-input';
      }
    }
  }
};

export const changeDuplicatedInputsColor = (list, $$inputs) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = i + 1; j < 7; j += 1) {
      if (list[i] === list[j]) {
        $$inputs[i].className = 'duplicated-input';
        $$inputs[j].className = 'duplicated-input';
      }
    }
  }
};

export const changeOverInputsColor = ($$inputs) => {
  $$inputs.forEach(($input) => {
    if ($input.valueAsNumber > 45) {
      $input.className = 'over-input';
    }
  });
};
