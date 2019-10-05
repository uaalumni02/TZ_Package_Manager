import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Mock from '../mock/index';
import app from '../../src/server';

const http = request.agent(app);
const { expect } = chai;

chai.use(chaiHttp);
chai.should()

const deliveryPath = '/api/delivery';
const userPath = '/api/user';
let validAdminToken;

describe('Delivery', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.token;
                done();
            });
    });
    describe('add Delivery', () => {
        it('should not register delivery if no valid in header', (done) => {
            request(app)
                .post(deliveryPath)
                .send(Mock.delivery)
                .expect(401, done);
        });
    });
    describe('add Delivery', () => {
        it('should register delivery since there is a valid header', (done) => {
            request(app)
                .post(deliveryPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send(Mock.delivery)
                .expect(201, done);
            Mock.delivery.should.be.a('object')
            expect(Mock.delivery).to.have.property('name');
        });
    });

}).timeout(30000)





