import mongoose from 'mongoose';
const { Schema } = mongoose;

const isValidResidentName = (name) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
  };
  const isValidEmail = (email) => {
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i;
    return regExp.test(email)
  };
  const isValidPhoneNumber = (phone) => {
    const regExp = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/i;
    return regExp.test(phone)
  };

  const residentInformationSchema = Schema({
    __v: {
      type: Number,
      select: false
   },
    name: {
        type: String, 
        required: [true, 'name is required'], 
        min:2, 
        max: 12,
        validate: [isValidResidentName, 'Please enter valid patient name'],
    },
    email: {
        type: String, 
        required: [true,'Email address is required'],
        validate: [isValidEmail, 'Please enter a valid email address'],
    },
    phone: {
        type: String, 
        required: [true, 'Phone number is requrired'],
        validate: [isValidPhoneNumber, 'Please enter a valid phone number'],
    },
});

export default mongoose.model('Resident', residentInformationSchema);

