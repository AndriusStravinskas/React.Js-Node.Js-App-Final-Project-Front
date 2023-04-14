import * as yup from 'yup';

const LoginValidationSchema = yup.object({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must have at least 3 symbols')
    .max(20, 'Username can\'t have more than 20 symbols'),

  password: yup.string()
    .required('Password is required')
    .min(5, 'Password must have at least 5 symbols')
    .max(20, 'Password can\'t have more than 20 symbols')

});

export default LoginValidationSchema;
