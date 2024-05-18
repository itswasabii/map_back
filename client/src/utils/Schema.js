import * as Yup from 'yup';

export const creditCardValidation = {
  creditCard: Yup.object().shape({
    amount: Yup.number().required('Amount is required').min(1, 'Amount must be more than 1'),
    creditCardNumber: Yup.string().required('Credit Card Number is required'),
    expirationDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
      .required('Expiration Date is required'),
    cvv: Yup.string().matches(/^\d{3,4}$/, 'Invalid CVV').required('CVV is required'),
  })
};

export const paypalValidation={
     paypal: Yup.object().shape({
    amount: Yup.number().required('Amount is required').min(1, 'Amount must be more than 1'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  }),
};

export const mpesaValidation={
      mpesa: Yup.object().shape({
    amount: Yup.number().required('Amount is required').min(1, 'Amount must be more than 1'),
    phoneNumber: Yup.string()
      .matches(/^\+?\d{10,12}$/, 'Invalid phone number')
      .required('Phone number is required'),
  }),
};



export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  occupation: Yup.string(),
  qualifications: Yup.string(),
  bio: Yup.string(),
  location: Yup.string(),
});

export const postValidation = Yup.object({
  category: Yup.string().required('category is required'),
  content: Yup.string().required('content required'),
  userId: Yup.string().required('user id is required'),
  cohortId: Yup.string().required('cohort id is required'),
  media: Yup.mixed().test(
    'fileType',
    'File must be an image or a video',
    (value) => {
      if (!value) return true;
      const supportedFormats = /^image\/.*|^video\/.*$/;
      return supportedFormats.test(value.type);
    }
  ),
}).test(
  'content-or-media',
  'At least one of content or media must be provided',
  function (value) {
    const{content,media} = value;
    return content || media
  }

);

