
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

const responseOkCreated = (res) => {
    return res.status(201).json({
        success: true,
        message: "added",
    });
}

const responseOk = (res, data) => {
    return res.status(200).json({
        success: true,
        data
    });
}


export {
    responseBadRquest,
    responseNotFound,
    responseOkCreated,
    responseOk
}