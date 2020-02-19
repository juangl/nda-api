const secureGet = (object, route) => {
  const path = route.split('.');
  for (let i = 0; i < path.length; i++) {
    const property = object[path[i]];
    if (property) {
      object = property;
    } else {
      return undefined;
    }
  }
  return object;
};

module.exports = {
  secureGet,
};
