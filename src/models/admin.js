import mongoose from "mongoose";
const { Schema } = mongoose;

import isValidUserName from "../helpers/model/admin";

const AdminSchema = Schema({
  username: {
    type: String,
    required: [true, "Please enter valid admin name"],
    validate: [isValidUserName, "Please enter valid admin name"]
  },
  password: {
    type: String,
    required: true
  },
  
  __v: {
    type: Number,
    select: false
  }
});

AdminSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Admin", AdminSchema);