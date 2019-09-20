import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import residentRoutes from '../src/routes/resident.route';
const { expect } = chai;
var jwt = require('jsonwebtoken');
import { config } from 'dotenv';
var request = require('supertest');

chai.use(chaiHttp);
chai.should()