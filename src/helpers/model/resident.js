const isValidResidentName = (name) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(name)
  };
  const isValidEmail = (email) => {
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/i;
    return regExp.test(email)
  };
  const isValidPhoneNumber = (phone) => {
    const regExp = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/i;
    return regExp.test(phone)
  };

  export {
      isValidResidentName,
      isValidEmail,
      isValidPhoneNumber
  }