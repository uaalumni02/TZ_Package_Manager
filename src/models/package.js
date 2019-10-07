import mongoose from 'mongoose';
const { Schema } = mongoose;

const isValidTime = (time) => {
    const regExp = /[1-9]{1,2}[:.,-]?/i
    return regExp.test(time)
};

const packageInformationSchema = mongoose.Schema({
    __v: {
        type: Number,
        select: false
     },
    deliveryDate: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: String,
        required: [true, 'Time is required'],
        validate: [isValidTime, 'Please enter a valid Time'],
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

});


export default mongoose.model('Package', packageInformationSchema);