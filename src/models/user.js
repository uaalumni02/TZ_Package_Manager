import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var validate = require('mongoose-validator')

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 10],
        message: 'should be between 3 and 10 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'should contain alpha-numeric characters only'
    })
];



const UserSchema = new Schema({
    username:
    {
        type: String,
        required: true,
        unique: true,
        validate: nameValidator
    },
    password:
    {
        type: String,
        required: true,
        unique: true
    },
});

export default mongoose.model('User', UserSchema);