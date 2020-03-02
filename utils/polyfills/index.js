Object.defineProperty(Object.prototype, 'secureGet', {
  value: function(path, defaultValue) {
    const result = String.prototype.split
      .call(path, /[,[\].]+?/)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        this,
      );

    return result === undefined || result === this ? defaultValue : result;
  },
});

Object.defineProperty(Object.prototype, 'deleteProperties', {
  value: function(properties = []) {
    if (!Array.isArray(properties)) {
      throw new Error(
        'You must provide an array argument to deleteProperties Object method',
      );
    }
    if (!properties.length) return;
    properties.forEach(property => delete this[property]);
  },
});
