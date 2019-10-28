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

const userPath = '/api/user';
const loginPath = '/api/user/login';
let validAdminToken;
let id;

let testUser = Mock.user;

// Get the 

describe('User', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.token;
                const { _id:id, token } = response.body;
                // 
                testUser = { ...testUser, id, token }
                done();
            });
    });
    describe('add User', () => {
        it('should register user', (done) => {
            request(app)
                .post(userPath)
                .send(Mock.user)
                .expect(201, done);
            Mock.user.should.be.a('object')
            expect(Mock.user).to.have.property('username');
            expect(Mock.user).to.have.property('password');
        });
    });
    describe('get user', () => {
        it('should not get user since no valid token', (done) => {
            request(app)
                .get(userPath)
                .expect(401, done);
        });
    });
    describe('login user', () => {
        it('should not login user since no valid token', (done) => {
            request(app)
                .post(loginPath)
                .send(Mock.user)
                .expect(401, done);
        });
    });
    describe('login user', () => {
        it('should login user', (done) => {
            request(app)
                .post(loginPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .expect(201);
            done()
        });
    });

    describe('get user', () => {
        it('should get users since valid token', (done) => {
            chai.request(app)
                .get(userPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    id = response.body.data[0]._id
                    response.body.should.be.a('object')
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data[0].username')
                    expect(response.body).to.have.nested.property('data[0].password')
                    done();
                });
        });
    });
    describe(' get user by Id', () => {
        it('should not get user by id since no valid token', (done) => {
            request(app)
                .get('/api/user/' + id)
                .expect(401, done);
        });
    });
    describe(' get user by Id', () => {
        it('should get user by id since valid token', (done) => {
            chai.request(app)
                .get('/api/user/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data.username')
                    expect(response.body).to.have.nested.property('data.password')
                    done();
                });
        });
    });
    describe(' delete user by id', () => {
        it('should not delete by id since no valid token', (done) => {
            request(app)
                .delete('/api/user/' + id)
                .expect(401, done);
        });
    });

    describe(' delete user by id', () => {
        it('should delete by id since valid token', (done) => {
            request(app)
                .delete('/api/user/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data.username')
                    expect(response.body).to.have.nested.property('data.password')
                    done();
                });
        });
    });

}).timeout(30000)