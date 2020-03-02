module.exports = requiredFields => (req, res, next) => {
  if (!Array.isArray(requiredFields)) {
    throw new Error(
      `${typeof requiredFields} type provided to requiredQueryParams middleware, expected array of strings`,
    );
  }

  const missingFields = [];
  let errorString = '';
  let missings = 0;

  for (let i = 0; i < requiredFields.length; i++) {
    const currentField = requiredFields[i];
    if (!req.query[currentField]) {
      if (typeof currentField !== 'string') {
        throw new Error(
          'Invalid field type provided to requiredFields argument of requiredQueryParams middleware',
        );
      }
      missings++;
      missingFields.push(currentField);
    }
  }

  if (missingFields.length === 1) {
    errorString = missingFields[0];
  } else if (missingFields.length) {

    const firstPart = missingFields.slice(0, missingFields.length - 1);
    errorString = firstPart.join(', ');
    errorString += ` and ${missingFields[missingFields.length - 1]}`;
  }

  if (errorString.length) {
    errorString += ` query param${missings <= 1 ? ' is' : 's are'} required`;
    throw new Error(errorString);
  } else {
    next();
  }
};
