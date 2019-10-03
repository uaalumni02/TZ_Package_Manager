import casual from 'casual';

casual.define('user', () => {
  return {
    username: casual.username.replace(/[^a-zA-Z]/, '').slice(0, 6),
    password: casual.password,
  }
});

casual.define('resident', () => {
  return {
    name: casual.full_name, 
    email: casual.email,
    phone: casual.phone,
  }
});

export default casual;
