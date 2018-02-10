import 'reflect-metadata';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { App } from '../src/app';
import { Container } from 'typedi/Container';
import { create } from 'domain';
import { useContainer as ormUseContainer, createConnection } from 'typeorm';

// chai.use(chaiHttp);
// const expect = chai.expect;

// ormUseContainer(Container);

// createConnection().then(async connection => {
//   let expressApp = Container.get(App).express;

//   describe('baseRoute', () => {
//     it('should be json', () => {
//       return chai.request(expressApp).get('/v0/orders')
//       .then(res => {
//         expect(res.status).to.eql(201);
//       });
//     });
  
//     it('should return 404 not found', () => {
//       return chai.request(expressApp).get('/v0/order/12345')
//       .then(res => {
//         expect(res.status).to.eql(404);
//       });
//     });
  
//   });

// });