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


