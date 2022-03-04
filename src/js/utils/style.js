/* eslint-disable no-param-reassign */
/* eslint-disable max-depth */
export const changeOkInputsColor = (list, $$inputs) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = i + 1; j < 7; j += 1) {
      if (list[i] !== list[j]) {
        $$inputs[i].style.background = '#FFF';
        $$inputs[j].style.background = '#FFF';
      }
    }
  }
};

export const changeDuplicatedInputsColor = (list, $$inputs) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = i + 1; j < 7; j += 1) {
      if (list[i] === list[j]) {
        $$inputs[i].style.background = '#FFBBBB';
        $$inputs[j].style.background = '#FFBBBB';
      }
    }
  }
};

export const changeOverInputsColor = ($$inputs) => {
  $$inputs.forEach((input) => {
    if (input.valueAsNumber > 45) {
      input.style.background = '#BFFFF0';
    }
  });
};
