const userModel = {
  email: 'string',
  password: 'string',
  firstName: 'string',
  lastName: 'string',
  phoneNumber: 'string'
}


module.exports = {
  user(data){
    let sanitized = {}
    for(each in data){
      if(each in userModel && typeof data[each] === userModel[each] ) sanitized[each] = data[each];
    }
    return sanitized;
  }
}