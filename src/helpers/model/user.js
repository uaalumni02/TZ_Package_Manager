const validate = require('mongoose-validator')

const nameValidator = [
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

export default nameValidator