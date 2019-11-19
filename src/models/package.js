import mongoose from 'mongoose';
const { Schema } = mongoose;

import isValidTime from '../helpers/model/package';

const packageInformationSchema = mongoose.Schema({
    deliveryDate: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
        min: 2,
        max: 25,
    },
    name: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
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


export default mongoose.model('Package', packageInformationSchema);