export const randomId = () =>
  `SK${Math.random()
    .toString(36)
    .substring(2, 8)}`;
