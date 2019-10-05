import casual from 'casual';

let name = casual.random_element(['USPS', 'UPS', 'Amazon', 'Postmates', 'FedEx']);

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

casual.define('delivery', () => {
  return {
    name,
  }
});

export default casual;
