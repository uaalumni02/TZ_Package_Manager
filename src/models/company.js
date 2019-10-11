import mongoose from 'mongoose';
const { Schema } = mongoose;

import isValidDeliveryName from '../helpers/model/company';

const companyInformationSchema = Schema({
    companyName: {
        type: String,
        required: [true, 'name is required'],
        min: 3,
        validate: [isValidDeliveryName, 'Please enter valid delivery name'],
    },
    __v: {
        type: Number,
        select: false
    },

});

export default mongoose.model('Company', companyInformationSchema);

