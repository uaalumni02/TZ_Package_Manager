import Db from "../db/db";
import Package from "../models/package";

import * as Response from "../helpers/response/response";
import validator from "../validator/package";

import moment from "moment";
import gmail from "node-gmailer";

class PackageData {
  static async addPackage(req, res) {
    const packageData = { ...req.body };
    const deliveryTimestamp = moment(
      packageData.deliveryDate,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    packageData.deliveryDate = deliveryTimestamp;
    try {
      const result = await validator.validateAsync(packageData);
      if (!result.error) {
        const packageInfo = await Db.addPackage(Package, packageData);
        return Response.responseOkCreated(res, packageInfo);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getAllPackages(req, res) {
    try {
      const allPackages = await Db.getAllPackages(Package);
      return Response.responseOk(res, allPackages);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getPackageByResident(req, res) {
    const { resident } = req.params;
    try {
      const packageByResident = await Db.getPackageByResident(
        Package,
        resident
      );
      return Response.responseOk(res, packageByResident);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }

  static async getPackageByDate(req, res) {
    const { deliveryDate } = req.params;
    try {
      const packageByDate = await Db.getPackageByDate(Package, deliveryDate);
      return Response.responseOk(res, packageByDate);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getPackageById(req, res) {
    const { id } = req.params;
    try {
      const packageById = await Db.getPackageById(Package, id);
      return Response.responseOk(res, packageById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }

  static async deliverPackage(req, res) {
    const packageId = req.params.id;
    const packageData = { ...req.body };
    const { isDelivered } = req.body;
    const updatePackage = {
      isDelivered
    };
    try {
      const delivered = await Db.deliverPackage(
        Package,
        packageId,
        packageData
      );
      const dateString = moment
        .unix(delivered.deliveryDate)
        .format("MM/DD/YYYY hh:mmA");
      const customerMessage =
        "Hi, you have a package " +
        " " +
        "deliveried on" +
        " " +
        dateString +
        " " +
        "Addtional information: " +
        "" +
        delivered.additionalInfo;
      const recipient = process.env.GMAIL_ADDRESS;
      const messageData = {
        subject: "Package Delivery Confirmation",
        text: customerMessage
      };
      const sendHandler = () => {
        gmail
          .send(recipient, messageData)
          .then(response => {})
          .catch(error => {});
      };
      sendHandler();
      return Response.responseOk(res, updatePackage, delivered);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async deletePackage(req, res) {
    const packageId = req.params.id;
    const packageData = { ...req.body };
    const { isDeleted } = req.body;

    const deletePackage = {
      isDeleted
    };
    try {
      const deleted = await Db.removePackage(Package, packageId, packageData);
      return Response.responseOk(res, deletePackage, deleted);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async editPackage(req, res) {
    const packageId = req.params.id;
    const packageData = { ...req.body };
    const deliveryTimestamp = moment(
      packageData.deliveryDate,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    packageData.deliveryDate = deliveryTimestamp;
    try {
      const result = await validator.validateAsync(packageData);
      if (!result.error) {
        const packageToUpdate = await Db.editPackage(
          Package,
          packageId,
          packageData
        );
        return Response.responseOk(res, packageToUpdate);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default PackageData;
