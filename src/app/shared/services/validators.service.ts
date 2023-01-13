import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const PNV = require('google-libphonenumber').PhoneNumberUtil.ValidationResult;
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() {
  }

  required(skipWhiteSpaceValidation?: any): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      let isValid;
      if (currentControl.value !== null && currentControl.value !== undefined) {
        if (currentControl.value === false || currentControl.value === true) {
          isValid = true;
        } else {
          if (skipWhiteSpaceValidation === true) {
            isValid = String(currentControl.value).length > 0;
          } else {
            isValid = String(currentControl.value).trim().length > 0;
          }
        }

      } else {
        isValid = false;
      }
      if (!isValid) {
        return {
          required: {
            valid: false
          }
        }
      } else {
        return null;
      }
    };
  }

  mail(): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      const emailRegEx: RegExp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
      const isValid = emailRegEx.test(currentControl.value);
      if ((currentControl.value !== null && currentControl.value !== '') && !isValid) {
        return {
          incorrectMailFormat: {
            valid: false
          }
        };
      } else {
        return null;
      }
    }
  }

  number({min, max}: any): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      const value = currentControl.value;
      const price = parseInt(currentControl.value);
      if (isNaN(price)) {
        return {
          onlyNumbers: {
            valid: false
          }
        };
      } else {
        if (price > max) {
          return {
            inValidMax: {
              max,
              price,
              valid: false
            }
          };
        } else if (price < min) {
          return {
            inValidMin: {
              min,
              price,
              valid: false
            }
          };
        } else {
          return null;
        }
      }
    };
  }

  pattern(pattern: RegExp, message?: string): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      const value = currentControl.value;
      const isValid = pattern.test(value);
      if (isValid) {
        return null;
      } else {
        return {
          pattern: {
            valid: false,
            message
          }
        };
      }
    };
  }

  PhoneNumberValidator(regionCode: string | undefined = undefined): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let validNumber = false;
      try {
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(control.value, regionCode);
        validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
      } catch (e) {
      }

      if (control.value !== null && control.value !== '') {
        if (validNumber) {
          return null;
        } else {
          return {
            wrongNumber: {
              valid: false
            }
          }
        }
      } else {
        return null
      }

      /*if (validNumber) {
        return null;
      } else {
        return {
          wrongNumber: {
            valid: false
          }
        }
        // return validNumber ? null : {'wrongNumber': {value: control.value}};
      }*/
    }
  }

}
