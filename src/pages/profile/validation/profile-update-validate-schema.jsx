import * as yup from 'yup';

const ProfileUpdateValidationSchema = yup.object({

  imageUrl: yup.string()
    .required('Image url is required')
    .url('Invalid image url')
    .matches(/^(http(s?):)([/|.|\w|\s|-])/, 'Invalid image url'),

  username: yup.string()
    .required('Username is required')
    .min(5, 'Username must have at least 5 symbols')
    .max(20, 'Username can\'t have more than 20 symbols')
    .matches(/^[^!#$%^&*()]*$/, 'Username cannot contain !#$%^&*() characters'),

});

export default ProfileUpdateValidationSchema;
