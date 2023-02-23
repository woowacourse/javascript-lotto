import domList from '@lotto/view/stepTwo/domList';

const resetAllInputValues = () => {
  [...domList.allInputs].forEach(input => {
    input.value = null;
  });
};

export default resetAllInputValues;
