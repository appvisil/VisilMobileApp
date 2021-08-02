
export class Filter {
  modelFieldName = '';
  fieldValue = '';
  operation = '==';

  constructor(modelFieldName, fieldValue = null, operation = null) {
    this.modelFieldName = modelFieldName;
    this.fieldValue = fieldValue;
    this.operation = operation;
  }
}