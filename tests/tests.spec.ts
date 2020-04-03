import 'mocha';
import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Test GET API Request', () => {
  it('Home Page returns response_code 200', () => {
    return chai.request(app).get('/')
      .then(res => {
        chai.expect(res.status).to.eql(200);
      })
  })

  it('HealthCheck return webpage', () => {
    return chai.request(app).get('/health')
      .then(res => {
        chai.expect(res).to.be.html;
      })
  })

  it('HealthCheck return message', () => {
    return chai.request(app).get('/health')
      .then(res => {
        chai.expect(res.text).to.eql("App running");
      })
  })
})
