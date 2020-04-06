import mongoose from 'mongoose';
const { Schema } = mongoose;

const packageInformationSchema = mongoose.Schema({
    deliveryDate: {
        type: Number,
        required: true,
    },
    additionalInfo: {
        type: String,
        min: 2,
        max: 25,
    },
    isDelivered: {
        type: Boolean,
    },
    isDeleted: {
        type: Boolean,
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