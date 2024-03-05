function disableSectionElements($target, outerClass, innerClass) {
  $target.querySelectorAll(`${outerClass} ${innerClass}`).forEach((el) => (el.disabled = true));
}

export default disableSectionElements;
