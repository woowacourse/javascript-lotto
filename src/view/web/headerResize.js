function headerResize() {
  let timeout = null;

  window.addEventListener("scroll", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const header = document.querySelector("header");
      const { scrollY } = window;

      if (scrollY >= 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }, 100);
  });
}

export default headerResize;
