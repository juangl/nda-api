module.exports = db => ({
  login: require('./login')(db),
  getUser: require('./getUser')(db),
  getRoleId: require('./getRoleId')(db),
  getPermissions: require('./getPermissions')(db),
});
