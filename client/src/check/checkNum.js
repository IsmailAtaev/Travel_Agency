export function checkNum(value) {
  const reg = new RegExp("^[0-9]+$");
  return reg.test(value);
}
