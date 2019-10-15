import mongoose from 'mongoose';
const { Schema } = mongoose;

import nameValidator from '../helpers/model/user';

const UserSchema = Schema({
    username:
    {
        type: String,
        required: [true, 'Please enter valid username'],
        validate: nameValidator
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

// UserSchema.pre('save', () => {
//     // Do your hashing here 
//     this.password = hash(password);
//     return this;
// });

export default mongoose.model('User', UserSchema);