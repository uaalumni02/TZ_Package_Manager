import Company from '../models/company';
import  Db from '../db/db';
import * as Response from '../helpers/response/response';


import schema from '../schema/company';

class CompanyData {
    static async addCompanyName(req, res) {
        const companyData = { ...req.body };
        try {
            const result = await schema.validateAsync(companyData);
            if (!result.error) {
                const companyName = await Db.addCompany(Company, companyData)
                return Response.responseOkCreated(res, companyName)
            } // bad reques
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async allCompanies(req, res) {
        try {
            const allCompanyNames = await Db.getAllCompanies(Company)
            //check by length to see if im getting something back
            return Response.responseOk(res, allCompanyNames)
        } catch (error) {
            // server error 
            return Response.responseNotFound(res)
        }
    }
    static async getCompanyById(req, res) {
        const { id } = req.params;
        try {
            const companyById = await Db.getCompanyById(Company, id)
            return Response.responseOk(res, companyById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
}

export default CompanyData