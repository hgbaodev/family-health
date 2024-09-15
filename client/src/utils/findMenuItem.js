function findItemByKey(items, key) {
  for (const item of items) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const child = findItemByKey(item.children, key);
      if (child) {
        return child;
      }
    }
  }
}

function findItemByPath(items, path) {
  for (const item of items) {
    const regex = new RegExp(`^${item.path}(/|$)`);
    if (regex.test(path)) {
      return item;
    }
    if (item.children) {
      const child = findItemByPath(item.children, path);
      if (child) {
        return child;
      }
    }
  }
}

export { findItemByKey, findItemByPath };
