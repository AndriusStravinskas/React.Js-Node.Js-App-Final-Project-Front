import * as yup from 'yup';

const RegisterValidationSchema = yup.object({
  username: yup.string()
    .required('Username is required')
    .min(5, 'Username must have at least 5 symbols')
    .max(20, 'Username can\'t have more than 20 symbols')
    .matches(/^[^!#$%^&*()]*$/, 'Username cannot contain !#$%^&*() characters'),

  email: yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^[^!#$%^&*()]*$/, 'Email cannot contain !#$%^&*() characters'),

  password: yup.string()
    .required('Password is required')
    .min(5, 'Password must have at least 5 symbols')
    .max(20, 'Password can\'t have more than 20 symbols')
    .matches(/[A-Z]{1}/, 'Password must have at least one upper case letter')
    .matches(/[a-z]{1}/, 'Password must have at least one lower case letter')
    .matches(/[0-9]{1}/, 'Password must have at least one number'),

  confirmPassword: yup.string()
    .required('Password must be confirmed')
    .oneOf([yup.ref('password')], 'Passowords must match'),

  imageUrl: yup.string()
    .url('Invalid image url')
    .matches(/^(http(s?):)([/|.|\w|\s|-])/, 'Invalid image url'),



});

export default RegisterValidationSchema;
