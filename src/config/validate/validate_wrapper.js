import constraints from './constraints.js';
import { validate } from 'validate.js';
import moment from 'moment';

export default function validatefield(fieldName, value) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  var formValues = {}
  formValues[fieldName] = value

  // Line 13-14 creates an temporary form with the validation fields
  // e.g. var formFields = {
  //                        email: {
  //                         presence: {
  //                          message: 'Email is blank'
  //                         }
  //                       }
  var formFields = {}
  formFields[fieldName] = constraints[fieldName]

  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {     
      return +moment.utc(value,"YYYY-MM-DD");
    },

    format: function(value, options) {
      var format = options.dateOnly ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm:ss";
      return moment.utc(value, format).format(format);
    }
    
  });

  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const result = validate(formValues, formFields)

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0]
  }

  return null
}

