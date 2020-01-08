module.exports = (obj, properties = []) => {
  if (!obj)
    throw new Error(
      'You must provide an object as the first argument to the deleteProperties utility',
    );
  if (!properties.length) return;
  properties.forEach(property => delete obj[property]);
};
