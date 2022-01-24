/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
/* export function validUsername(str) {
  const valid_map = ['test01', 'admin', 'editor', 'zsadmin'];
  return valid_map.indexOf(str.trim()) >= 0;
} */

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone);
}

/**
 * @param {string || number} IDCard
 * @returns {Boolean}
 */
export function validPIDCard(IDCard) {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(IDCard);
}
