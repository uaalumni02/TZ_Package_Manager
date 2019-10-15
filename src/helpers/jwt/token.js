import jwt from 'jsonwebtoken';
const { JWT_KEY } = process.env;


const sign = payload => {
  return jwt.sign(payload, JWT_KEY, { expiresIn: '60d' });
}

const decode = token => {
  return jwt.verify(token, JWT_KEY);
}

const tokenData = () => {
  const token = Token.sign({ id: _id, username })
}

export default {
  sign,
  decode,
  tokenData
 
}
