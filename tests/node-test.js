const chai = require('chai');
const assert = chai.assert;
const {Node} = require('../scripts/node.js')

describe('Node', () => {
  it('should be able to hold a value that is passed in', () => {
    let node = new Node('garbage man');

    assert.equal(node.value, 'garbage man');
  })

  it
})