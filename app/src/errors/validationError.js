
class ValidationError{
  name;
  message;
  constructor(message){
    this.name = 'validationError';
    this.message = message;
  }
}

module.exports = ValidationError;