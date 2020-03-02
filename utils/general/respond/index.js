const debug = require('debug')('responder');

module.exports = (req, res) => (
  result,
  callback = err =>
    debug(`Gotten a${err ? 'n error' : 'success'} type response`),
) => {
  const response = {
    success: true,
    payload: undefined,
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
      if (req.pagination) {
        response.payload = {
          metadata: {
            ...req.pagination.config,
            count: result.length,
          },
          data: result,
        };
      } else {
        response.payload = result;
      }
      break;
    case typeof result === 'object':
      response.payload = result;
      break;
    case typeof result === 'boolean':
      response.success = result;
      break;
    default:
      response.success = false;
      response.payload = 'There is an unhandled data type in respond function';
      break;
  }
  res.send(response);
  callback(!response.success);
};
