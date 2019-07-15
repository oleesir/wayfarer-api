import '@babel/polyfill';
import { expect } from 'chai';
import Model from '../src/db/index';

import {
} from './helpers/fixtures';

const users = new Model('users');


describe('Model: bad input', () => {
  describe('create', () => {
    it('should not create a new user with bad values', (done) => {
      users.create(
        ['first_name', 'last_name', 'email', 'password', 'is_admin'],
        ['\'Emodi\', \'amyaain@gmail.com\', \'asdfghjklwerdtfguyhujisfdghj\', true']
      ).then((result) => {
        expect(result === undefined).to.equal(true);
        done();
      }).catch(err => done(err));
    });
  });

  describe('select', () => {
    it('should not select from table with bad constraint', (done) => {
      users.select(
        ['*'],
        ['email=\'amy@gmail.com']
      ).then((result) => {
        expect(result === undefined).to.equal(true);
        done();
      }).catch(err => done(err));
    });
  });

  describe('update', () => {
    it('should not update table with bad constraint', (done) => {
      users.update(['status=\'cancelled'], ['id=1'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });

  describe('delete', () => {
    it('should not delete from table with bad constraint', (done) => {
      users.delete(['id=1"'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });

  describe('selectAll', () => {
    it('should not select all from table with bad attributes', (done) => {
      users.selectAll(['"*'])
        .then((result) => {
          expect(result === undefined).to.equal(true);
          done();
        }).catch(err => done(err));
    });
  });
});
