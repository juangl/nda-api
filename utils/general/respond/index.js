const debug = require('debug')('responder');

module.exports = (
  result,
  res,
  callback = err =>
    debug(`Gotten a${err ? 'n error' : 'success'} type response`),
) => {
  const response = {
    success: true,
    payload: null,
  };
  switch (true) {
    case result instanceof Error:
      response.success = false;
      response.payload = {
        message: result.message,
      };
      break;
    case result.__proto__.constructor.name === 'ResultSetHeader':
      response.success = !!result.affectedRows;
      if (!result.affectedRows)
        response.payload = {
          message:
            'There was an error while trying to insert or update the resource',
        };
      break;
    case Array.isArray(result):
    case typeof result === 'object':
      response.payload = result;
      break;
    default:
      response.payload = 'There is an unhandled data type in respond function';
      console.error(new Error(response.payload, result));
      break;
  }
  res.send(response);
  callback(!response.success);
};
