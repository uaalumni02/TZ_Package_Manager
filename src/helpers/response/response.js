
const responseBadRquest = (res) => {
    return res.status(400).json({
        success: false,
        message: 'unable to save provided input'
    });
}

const responseNotFound = (res) => {
    return res.status(404).json({
        success: false,
        message: 'Unable to show response'
    });
}

const responseOkCreated = (res, data) => {
    return res.status(201).json({
        success: true,
        message: "added",
        data
    });
}

const responseOk = (res, data) => {
    return res.status(200).json({
        success: true,
        data
    });
}
const responseConflict = (res) => {
    return res.status(409).json({
        success: false,
        message: 'user name exist'
    });
}
const responseBadAuth = (res) => {
    return res.status(401).json({
        success: false,
        message: 'auth failed'
    });
}

const responseOkUserCreated = (res) => {
    return res.status(201).json({
        success: true,
        message: "user successfully added",
    });
}

export {
    responseBadRquest,
    responseNotFound,
    responseOkCreated,
    responseOk,
    responseConflict,
    responseBadAuth,
    responseOkUserCreated
}