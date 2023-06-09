import * as yup from 'yup';

const ChangePasswordValidationSchema = yup.object({

  oldPassword: yup.string()
    .required('Password is required')
    .min(5, 'Password must have at least 5 symbols')
    .max(20, 'Password can\'t have more than 20 symbols'),


  newPassword: yup.string()
    .required('Password is required')
    .min(5, 'Password must have at least 5 symbols')
    .max(20, 'Password can\'t have more than 20 symbols')
    .matches(/[A-Z]{1}/, 'Password must have at least one upper case letter')
    .matches(/[a-z]{1}/, 'Password must have at least one lower case letter')
    .matches(/[0-9]{1}/, 'Password must have at least one number'),

  confirmPassword: yup.string()
    .required('Password must be confirmed')
    .oneOf([yup.ref('newPassword')], 'Passowords must match'),
});

export default ChangePasswordValidationSchema;
