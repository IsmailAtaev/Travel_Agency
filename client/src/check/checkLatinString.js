export function checkLatinString(value) {
  const regexp = /[A-z\u00C0-\u00ff]+/g;
  return regexp.test(value);
}
