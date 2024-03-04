function numericInputFilter(target, limitLength = null) {
  const inputBox = target;
  if (limitLength && inputBox.value.length > limitLength) {
    inputBox.value = inputBox.value.slice(0, limitLength);
  }
  inputBox.value = inputBox.valueAsNumber || '';
}

export default numericInputFilter;
