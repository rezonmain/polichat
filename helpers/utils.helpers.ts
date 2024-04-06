/**
 * Returns a random integer with a fixed length
 * @param len - length of the integer
 * @returns random integer
 */
const ranFixLenInt = (len: number): number => {
  const pow = Math.pow(10, len - 1);
  return Math.floor(pow + Math.random() * (pow * 9));
};

export { ranFixLenInt };
