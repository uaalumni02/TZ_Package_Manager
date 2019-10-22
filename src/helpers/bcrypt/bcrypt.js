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

const compareHash = async (password, hash) => {
  return new Promise((resolve, error) => {
    return bcrypt.compare(password, hash, (err, success) => {
      if (err) { return error(err) }
      return resolve(success)
    })
  })
}

export default {
  hashPassword,
  compareHash
};