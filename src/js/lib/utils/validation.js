function hasDuplicateInArray(array) {
  const arrayLength = array.length;
  const setLength = new Set(array).size;

  return setLength < arrayLength;
}

export { hasDuplicateInArray };
