import mongoose from 'mongoose';
const { Schema } = mongoose;

const isValidDeliveryName = (name) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
};



const companyInformationSchema = Schema({
    __v: {
        type: Number,
        select: false
     },
    companyName: {
        type: String,
        required: [true, 'name is required'],
        min: 2,
        // validate: [isValidDeliveryName, 'Please enter valid delivery name'],
    },

});

export default mongoose.model('Company', companyInformationSchema);

