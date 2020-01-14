import mongoose from 'mongoose';
const { Schema } = mongoose;

import * as validate from '../helpers/model/resident';

const residentInformationSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    min: 2,
    max: 12,
    validate: [validate.isValidResidentName, 'Please enter valid resident name'],
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    validate: [validate.isValidEmail, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is requrired'],
    validate: [validate.isValidPhoneNumber, 'Please enter a valid phone number'],
  },
  isDeleted: {
    type: Boolean,
},
  companyName: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  __v: {
    type: Number,
    select: false
  },
});

export default mongoose.model('Resident', residentInformationSchema);

