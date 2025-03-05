export const generateverification_token = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
