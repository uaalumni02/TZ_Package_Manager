import bcrypt from 'bcrypt';


const hashPassword = async (password, rounds) => {
    return new Promise((resolve, reject) => {
      return bcrypt.hash(password, rounds, (err, hash) => {
        if (err)
          return reject(null);
        return resolve(hash);
      });
    })
  }

  export default { hashPassword };