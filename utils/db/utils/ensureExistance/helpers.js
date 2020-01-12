const validateNumber = string => {
  if (Number.isNaN(parseInt(string)))
    throw new Error('Invalid configuration parameter format');
};

const lessThanValidator = (amount, results) => {
  if (results < amount) return true;
  else return false;
};

const greaterThanValidator = (amount, results) => {
  if (results > amount) return true;
  else return false;
};

const equalityValidator = (amount, results) => amount === results;

module.exports = {
  validateNumber,
  lessThanValidator,
  greaterThanValidator,
  equalityValidator,
};
