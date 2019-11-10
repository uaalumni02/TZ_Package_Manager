import casual from 'casual';

let companyName = casual.random_element(['USPS', 'UPS', 'Amazon', 'Postmates', 'FedEx']);
let deliveryTime = casual.random_element(['9:00 am', '10:00 pm']);
let deliveryDate = casual.random_element(['2019-10-24', '2019-10-26']);


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

casual.define('company', () => {
  return {
    companyName,
  }
});

casual.define('package', () => {
  return {
    deliveryDate,
    deliveryTime,
    additionalInfo: casual.word 
  }
});

export default casual;
