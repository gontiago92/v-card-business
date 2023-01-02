import { defineRule, configure } from 'vee-validate';
import { required, email, length } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';


export const useValidation = () => {

  defineRule('required', required);
  defineRule('email', email);
  defineRule('length', length);
  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
          email: 'This format is not a valid email address !',
          length: 'This field needs to contain at least {0} characters !'
        },
      },
      fr: {
        messages: {
          required: 'Ce champs est requis',
        },
      },
    }),
  });


}
