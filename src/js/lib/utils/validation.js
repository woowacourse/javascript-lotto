function hasDuplicate(array) {
  const arrayLength = array.length;
  const setLength = new Set(array).size;

  return setLength < arrayLength;
}

export { hasDuplicate };
