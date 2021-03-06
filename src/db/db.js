class Db {
  static async addResidents(model, data) {
    try {
      const newResident = await model({ ...data });
      return newResident.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllResidents(model) {
    try {
      const allResidents = await model.find({});
      return allResidents;
    } catch (error) {
      throw error;
    }
  }
  static async getResidentById(model, id) {
    try {
      const resident = await model.findById(id);
      return resident;
    } catch (error) {
      throw error;
    }
  }
  static async editResident(model, residentId, residentData) {
    try {
      const filter = { _id: residentId };
      const updatedResident = await model.findOneAndUpdate(
        filter,
        residentData,
        { new: true }
      );
      return updatedResident;
    } catch (error) {
      throw error;
    }
  }
  static async removeResident(model, residentId, residentData) {
    try {
      const filter = { _id: residentId };
      const removeResident = await model.findOneAndUpdate(filter, residentData, {
        new: true
      });
      return removeResident;
    } catch (error) {
      throw error;
    }
  }
  static async addCompany(model, data) {
    try {
      const newDelivery = await model({ ...data });
      return newDelivery.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllCompanies(model) {
    try {
      const allDeliverers = await model.find({});
      return allDeliverers;
    } catch (error) {
      throw error;
    }
  }
  static async getCompanyById(model, id) {
    try {
      const deliverer = await model.findById(id);
      return deliverer;
    } catch (error) {
      throw error;
    }
  }
  static async addPackage(model, data) {
    try {
      const newPackage = await model({ ...data });
      return newPackage.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllPackages(model) {
    try {
      const allPackages = await model
        .find({})
        .populate("name companyName")
        .exec();
      return allPackages;
    } catch (error) {
      throw error;
    }
  }
  static async getPackageByResident(model, name) {
    try {
      const residentPackage = await model
        .find({ name })
        .populate("name companyName")
        .exec();
      return residentPackage;
    } catch (error) {
      throw error;
    }
  }
  
  static async getPackageByDate(model, deliveryDate) {
    try {
      const packages = await model.find({ deliveryDate });
      return packages;
    } catch (error) {
      throw error;
    }
  }
  static async getPackageById(model, id) {
    try {
      const packageById = await model
        .findById(id)
        .populate("name companyName")
        .exec();
      return packageById;
    } catch (error) {
      throw error;
    }
  }
  static async deliverPackage(model, packageId, packageData) {
    try {
      const filter = { _id: packageId };
      const deliverPackage = await model.findOneAndUpdate(filter, packageData, {
        new: true
      });
      return deliverPackage;
    } catch (error) {
      throw error;
    }
  }
  static async removePackage(model, packageId, packageData) {
    try {
      const filter = { _id: packageId };
      const removePackage = await model.findOneAndUpdate(filter, packageData, {
        new: true
      });
      return removePackage;
    } catch (error) {
      throw error;
    }
  }
  static async editPackage(model, packageId, packageData) {
    try {
      const filter = { _id: packageId };
      const updatedPackage = await model.findOneAndUpdate(
        filter,
        packageData,
        { new: true }
      );
      return updatedPackage;
    } catch (error) {
      throw error;
    }
  }
  static async findUser(model, username) {
    try {
      const user = await model.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async saveUser(model, user) {
    try {
      const newUser = await model({ ...user });
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers(model) {
    try {
      const allUsers = await model.find({});
      return allUsers;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(model, id) {
    try {
      const user = await model.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async removeUser(model, id) {
    try {
      const deleteUser = await model.findOneAndDelete({ _id: id });
      return {};
    } catch (error) {
      throw error;
    }
  }
  static async saveAdmin(model, admin) {
    try {
      const newAdmin = await model({ ...admin });
      return newAdmin.save();
    } catch (error) {
      throw error;
    }
  }
  static async findAdmin(model, username) {
    try {
      const admin = await model.findOne({ username });
      return admin;
    } catch (error) {
      throw error;
    }
  }
  static async getAllAdmins(model) {
    try {
      const allAdmins = await model.find({});
      return allAdmins;
    } catch (error) {
      throw error;
    }
  }
  static async getAdminById(model, id) {
    try {
      const admin = await model.findById(id);
      return admin;
    } catch (error) {
      throw error;
    }
  }
  static async removeAdmin(model, id) {
    try {
      const deleteAdmin = await model.findOneAndDelete({ _id: id });
      return {};
    } catch (error) {
      throw error;
    }
  }
  static async approveUser(model, userId, userData) {
    try {
      const filter = { _id: userId };
      const approveUser = await model.findOneAndUpdate(filter, userData, {
        new: true
      });
      return approveUser;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
