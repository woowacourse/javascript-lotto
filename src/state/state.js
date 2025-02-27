let originalApp;

export const setOriginalApp = (app) => {
  originalApp = app.cloneNode(true);
};

export const getOriginalApp = () => originalApp;
