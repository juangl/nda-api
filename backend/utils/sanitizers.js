const userModel = {
  email: 'string',
  password: 'string',
  firstName: 'string',
  lastName: 'string',
  phoneNumber: 'string'
}

const storeModel = {
  name: 'string',
  category: 'string',
  saying: 'string',
  address: 'string'
}

const types = {
  user: userModel,
  store: storeModel
}

module.exports = function(type, data){
  const model = types[type];
  let sanitized = {}
  for(each in data){
    if(each in model && typeof data[each] === model[each] ) sanitized[each] = data[each];
  }
  return sanitized;
}