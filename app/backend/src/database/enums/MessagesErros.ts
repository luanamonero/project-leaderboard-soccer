enum MessageError {
  invalidField = 'Incorrect email or password',
  emptyField = 'All fields must be filled',
  tokenNotFound = 'Token not found',
  invalidToken = 'Invalid token',
  equal = 'It is not possible to create a match with two equal teams',
  teamNotFound = 'There is no team with such id!',
}

export default MessageError;
