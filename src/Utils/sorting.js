const ASCENDING = (a, b) => a - b;

const sorts = (how) => (array) => array.sort(how);

export const sortAscending = sorts(ASCENDING);
