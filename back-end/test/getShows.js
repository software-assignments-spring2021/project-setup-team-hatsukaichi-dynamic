const chai = require('chai')
const chaiHttp = require('chai-http')
const nock = require('nock')
const sinon = require('sinon')
const expect = chai.expect
chai.use(chaiHttp)

const hello = () => 'hello world';

describe('hello function', () => {
  it('should return hello world', () => {
    const res = hello()
    expect(res).to.equal('hello world')
  })
})