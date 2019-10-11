import mongoose from 'mongoose';
const { Schema } = mongoose;

const isValidDeliveryName = (name) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
};



const companyInformationSchema = Schema({
    companyName: {
        type: String,
        required: [true, 'name is required'],
        min: 2,
        validate: [isValidDeliveryName, 'Please enter valid delivery name'],
    },
    __v: {
        type: Number,
        select: false
    },

});

export default mongoose.model('Company', companyInformationSchema);

