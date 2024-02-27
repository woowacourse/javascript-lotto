export const printError = (ele, errorMessage) => {
  ele.innerHTML = errorMessage;
  ele.classList.remove('hidden');
};

// export const hiddenEle = (ele) => {
//   ele.classList.add('hidden');
// };
