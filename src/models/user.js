import mongoose from 'mongoose';
const { Schema } = mongoose;

import nameValidator from '../helpers/model/user';

const UserSchema = Schema({
    username:
    {
        type: String,
        required: [true, 'Please enter valid username'],
        validate: [nameValidator, 'Please enter valid username'],
    },
    password:
    {
        type: String,
        required: true,
    },
    __v: {
        type: Number,
        select: false
    },
});

export default mongoose.model('User', UserSchema);