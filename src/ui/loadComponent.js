const BASE_URL = import.meta.env.BASE_URL;

const resolvePath = (path) => {
  if (path.startsWith("./")) return BASE_URL + path.slice(2);
  return path;
};

const loadComponent = (id, path) => {
  return fetch(path)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).insertAdjacentHTML("beforeend", data);
      return loadNestedComponents(document.getElementById(id));
    });
};

const loadNestedComponents = (root) => {
  const targetComponents = root.querySelectorAll("[data-component]");
  const promises = [...targetComponents].map((element) => {
    const elementPath = resolvePath(element.dataset.component);
    element.removeAttribute("data-component");
    return fetch(elementPath)
      .then((response) => response.text())
      .then((html) => {
        element.insertAdjacentHTML("beforeend", html);
        return loadNestedComponents(element);
      });
  });
  return Promise.all(promises);
};

export default loadComponent;
