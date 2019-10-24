class Db {
  static async addResidents(model, data) {
    const newResident = await new model({ ...data });
    return newResident.save()
      .then(res => {
        return res
      })
      .catch(error => {
        return { error }
      })
  }
  static async getAllResidents(model) {
    try {
      const allResidents = await model.find({});
      return allResidents
    } catch (error) {
      throw error;
    }
  }
  static async getResidentById(model, id) {
    try {
      const resident = await model.findById(id)
      return resident
    } catch (error) {
      throw error;
    }
  }
  static async editResident(model, data) {
    try {
      const editResident = await model.update({ ...data })
      return editResident
    } catch (error) {
      throw error
    }
  }
  static async addCompany(model, data) {
    const newDelivery = await new model({ ...data }); //fix this line dont need promise use await on return ; nohing happening on this line ; do other functions also
    return newDelivery.save()
      .then(res => {
        return res
      })
      .catch(error => {
        return { error }
      })
  }

  static async getAllCompanies(model) {
    try {
      const allDeliverers = await model.find({});
      return allDeliverers
    } catch (error) {
      throw error;
    }
  }
  static async getCompanyById(model, id) {
    try {
      const deliverer = await model.findById(id)
      return deliverer
    } catch (error) {
      throw error;
    }
  }
  static async addPackage(model, data) {
    const newPackage = await new model({ ...data });
    return newPackage.save()
      .then(res => {
        return res
      })
      .catch(error => {
        return { error }
      })
  }
  static async getAllPackages(model) {
    try {
      const allPackages = await model.find({})
        .populate('name companyName').exec()
      return allPackages
    } catch (error) {
      throw error;
    }
  }
  static async getPackageByResident(model, name) {
    try {
      const residentPackage = await model.find({ name })
        .populate('name companyName').exec()
      return residentPackage
    } catch (error) {
      throw error;
    }
  }
  static async removePackage(model, id) {
    try {
      const deletePackage = await model.findOneAndDelete({ _id: id })
      return deletePackage
    } catch (error) {
      throw error
    }
  }
  static async getPackageByDate(model, deliveryDate) {
    try {
      const packages = await model.find({ deliveryDate })
      return packages
    } catch (error) {
      throw error;
    }
  }

  static async findUser(model, username) {
    try {
      const user = await model.findOne({ username: username })
      return user
    } catch (error) {
      throw error;
    }
  }

  static async saveUser(model, user) {
    const newUser = await new model({ ...user });
    return newUser.save()
      .then(res => {
        return res
      })
      .catch(error => {
        return { error }
      })
  }
  static async getAllUsers(model) {
    try {
      const allUsers = await model.find({});
      return allUsers
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(model, id) {
    try {
      const user = await model.findById(id)
      return user
    } catch (error) {
      throw error;
    }
  }
  static async removeUser(model, id) {
    try {
      const deleteUser = await model.findOneAndDelete({ _id: id })
      return deleteUser
    } catch (error) {
      throw error
    }
  }
}

export default Db;