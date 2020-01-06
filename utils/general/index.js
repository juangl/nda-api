module.exports = {
  respond(result, res, callback = () => {}) {
    switch (true) {
      case result instanceof Error:
        res.json({
          success: false,
          payload: {
            message: result.message,
          },
        });
        callback(true);
        break;
      case result.__proto__.constructor.name === 'ResultSetHeader':
        let response = {
          success: !!result.affectedRows,
        };
        if (!result.affectedRows)
          response.payload = {
            message:
              'there was an error while trying to insert or update the resource',
          };
        res.json(response);
        callback(!response.success);
        break;
      case Array.isArray(result):
        if (!result.length) {
          res.json({
            success: false,
            payload: {
              message: 'there was not found any result',
            },
          });
          callback(true);
          break;
        }
        res.json({
          success: true,
          payload: result,
        });
        callback(false);
        break;
      case typeof result === 'object':
        res.json({
          success: true,
          payload: result,
        });
        callback(false);
        break;
      default:
        console.log(result);
        break;
    }
  },
};
