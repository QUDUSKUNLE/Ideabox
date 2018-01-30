/**
 * @description: This helps to format title for social sharing
 * @param {string} title idea title
 * @return {string} formatted Title
 */
export default (title) => {
  const splitTitle = title.split(' ');
  let index = 0;
  let result = '';
  while (index < splitTitle.length) {
    result += `${splitTitle[index]}%20`;
    index += 1;
  }
  return result;
};
