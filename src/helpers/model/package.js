const isValidTime = (time) => {
    const regExp = /[1-9]{1,2}[:.,-]?/i
    return regExp.test(time)
};

export default isValidTime