import mongoose from 'mongoose';
const { Schema } = mongoose;

const isValidDeliveryName = (name) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
};



const deliveryInformationSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        min: 2,
        max: 12,
        validate: [isValidDeliveryName, 'Please enter valid delivery name'],
    },

});

export default mongoose.model('Delivery', deliveryInformationSchema);

