function isOverlapped(array) {
  const uniqueArray = new Set(array);
  return uniqueArray.size !== array.length;
}

export default isOverlapped;
