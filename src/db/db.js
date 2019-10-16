import User from '../models/user';

export const addResidents = async (model, data) => {
  const newResident = new model({ ...data });
  return newResident.save()
    .then(res => {
      const { name, email, phone } = res, residentData = { name, email, phone }
      return residentData
    })
    .catch(error => {
      return { error }
    })
}
export const getAllResidents = async model => {
  try {
    const allResidents = await model.find({});
    return allResidents
  } catch (error) {
    throw error;
  }
}
export const getResidentById = async (model, id) => {
  try {
    const resident = await model.findById(id)
    return resident
  } catch (error) {
    throw error;
  }
}
export const editResident = async (model, data) => {
  try {
    const editResident = await model.update({ ...data })
    return editResident
  } catch (error) {
    throw error
  }
}
export const addCompany = async (model, data) => {
  const newDelivery = new model({ ...data });
  return newDelivery.save()
    .then(res => {
      const { companyName } = res, deliveryData = { companyName }
      return deliveryData
    })
    .catch(error => {
      return { error }
    })
}

export const getAllCompanies = async model => {
  try {
    const allDeliverers = await model.find({});
    return allDeliverers
  } catch (error) {
    throw error;
  }
}
export const getCompanyById = async (model, id) => {
  try {
    const deliverer = await model.findById(id)
    return deliverer
  } catch (error) {
    throw error;
  }
}
export const addPackage = async (model, data) => {
  const newPackage = new model({ ...data });
  return newPackage.save()
    .then(res => {
      const { deliveryDate, deliveryTime, additionalInfo, name, companyName } = res, packageData = { res }
      return packageData
    })
    .catch(error => {
      return { error }
    })
}
export const getAllPackages = async model => {
  try {
    const allPackages = await model.find({}).populate('name companyName').exec()
    return allPackages
  } catch (error) {
    throw error;
  }
}
export const getPackageByResident = async (model, name) => {
  try {
    const residentPackage = await model.find({ name }).populate('name companyName').exec()
    return residentPackage
  } catch (error) {
    throw error;
  }
}
export const removePackage = async (model, id) => {
  try {
    const deletePackage = await model.findOneAndDelete({ _id: id })
    return deletePackage
  } catch (error) {
    throw error
  }
}

export const findUser = async (model, username) => {
  try {
    const user = await model.find({ username })
    return user
  } catch (error) {
    throw error;
  }
}

export const addUser = async (username, password) => {
  const user = { username, password };
  return new User(user).save()
    .then(result => {
      const { _id, username } = result;
      tokenData({id: _id, username})
    })
    .catch(error => {
      return { error }
    })
}


export const getAllUsers = async model => {
  try {
    const allUsers = await model.find({});
    return allUsers
  } catch (error) {
    throw error;
  }
}
export const getUserById = async (model, id) => {
  try {
    const user = await model.findById(id)
    return user
  } catch (error) {
    throw error;
  }
}
export const removeUser = async (model, id) => {
  try {
    const deleteUser = await model.findOneAndDelete({ _id: id })
    return deleteUser
  } catch (error) {
    throw error
  }
}