const debug = require('debug')('sanitizer');

const userModel = {
  email: 'string',
  password: 'string',
  firstName: 'string',
  lastName: 'string',
  phoneNumber: 'string',
};

const storeModel = {
  name: 'string',
  category: 'string',
  saying: 'string',
  address: 'string',
  ownerId: {
    postable: true,
    type: 'number',
  },
};

const types = {
  user: userModel,
  store: storeModel,
};

module.exports = function(type, data, required, post) {
  const model = types[type];
  let sanitized = {};
  for (each in data) {
    if (each in model) {
      if (
        post &&
        typeof model[each] === 'object' &&
        model[each].postable &&
        model[each].type &&
        typeof data[each] === model[each].type
      ) {
        sanitized[each] = data[each];
        continue;
      }
      if (typeof data[each] === model[each]) sanitized[each] = data[each];
    }
  }
  debug(sanitized);
  if (required) {
    for (each in model) {
      if (!(each in sanitized)) {
        return false;
      }
    }
  }
  return sanitized;
};
