export default function toggleClassName(element, className) {
  if (element.classList.contains(className)) {
    return element.classList.remove(className);
  }
  return element.classList.add(className);
}
