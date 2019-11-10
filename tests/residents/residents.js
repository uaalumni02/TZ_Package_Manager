import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Mock from '../__mocks__/index';
import app from '../../src/server';

const http = request.agent(app);
const { expect } = chai;

chai.use(chaiHttp);
chai.should()

const residentPath = '/api/resident';
const userPath = '/api/user';
let validAdminToken;
let id;

describe('Resident', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.userdata.token;
                done();
            });
    });

    describe('add Resident', () => {
        it('should not register resident if no valid in header', (done) => {
            request(app)
                .post(residentPath)
                .send(Mock.resident)
                .expect(401, done);
        });
    });

    describe('add Resident', () => {
        it('should register resident since there is a valid header', (done) => {
            request(app)
                .post(residentPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send(Mock.resident)
                .expect(201, done);
            Mock.resident.should.be.a('object')
            expect(Mock.resident).to.have.property('name');
            expect(Mock.resident).to.have.property('email');
            expect(Mock.resident).to.have.property('phone');
        });
    });
    describe('get Resident', () => {
        it('should not get residents since no valid token', function (done) {
            request(app)
                .get(residentPath)
                .expect(401, done);
        });
    });
    describe('get Resident', () => {
        it('should get residents since valid token', (done) => {
            chai.request(app)
                .get(residentPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    id = response.body.data[0]._id
                    response.body.should.be.a('object')
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data[0].name')
                    expect(response.body).to.have.nested.property('data[0].email')
                    expect(response.body).to.have.nested.property('data[0].phone')
                    done();
                });
        });
    });
    describe(' get Resident by ID', () => {
        it('should get resident by id since valid token', (done) => {
            chai.request(app)
                .get('/api/resident/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data.name')
                    expect(response.body).to.have.nested.property('data.email')
                    expect(response.body).to.have.nested.property('data.phone')
                    done();
                });
        });

    });
    describe(' get Resident by ID', () => {
        it('should not get resident by id since no valid token', (done) => {
            request(app)
                .get('/api/resident/' + id)
                .expect(401, done);
        });
    });
    describe('update Resident', () => {
        it('should update resident given the id since valid token', (done) => {
            chai.request(app)
                .patch('/api/resident/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send({ name: "John Doe", email: 'doe@gmail.com', phone: '888-888-8888' })
                .end((err, response) => {
                    response.body.should.be.a('object');
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data.email').to.eql('doe@gmail.com');
                    expect(response.body).to.have.nested.property('data.phone').to.eql('888-888-8888');
                    expect(response.body).to.have.nested.property('data.name').to.eql('John Doe');
                    done()
                });
        });
    });
    describe('update Resident', () => {
        it('should not update resident given the id as no valid token', (done) => {
            request(app)
                .patch('/api/resident/' + id)
                .send({ name: "John", email: 'doe@gmail.com', phone: '888-888-8888' })
                .expect(401, done);
        });
    });
}).timeout(30000)





