export function camelToSnake(camelCaseString: String) {
  return camelCaseString.replace(/[\w]([A-Z])/g, function (match, char) {
    return match[0] + '_' + char.toLowerCase();
  });
}
