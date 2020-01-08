const isValidAdminName = (username) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(username)
  };

  export default isValidAdminName;