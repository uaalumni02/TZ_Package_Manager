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
      return data
    } catch (error) {
      throw error
    }
  }