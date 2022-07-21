export function paginate(item, pageNumbers, pageSize) {
  const startIndex = (pageNumbers - 1) * pageSize;
  return [...item].splice(startIndex, pageSize);
}
