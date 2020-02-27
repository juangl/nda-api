module.exports = (err, req, res, next) => {
  res.respond(err, err => console.log(err.message));
}