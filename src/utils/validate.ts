export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* export function validUsername(str) {
  const valid_map = ['test01', 'admin', 'editor', 'zsadmin'];
  return valid_map.indexOf(str.trim()) >= 0;
} */

export function validPhone(phone: string) {
  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)
}

export function validPIDCard(IDCard: string) {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(IDCard)
}
