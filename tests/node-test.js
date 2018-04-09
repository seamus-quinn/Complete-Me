const chai = require('chai');
const assert = chai.assert;
const {Node} = require('../scripts/node.js')

describe('Node', () => {
  it('should be able to hold a value that is passed in', () => {
    let node = new Node('garbage man');

    assert.equal(node.value, 'garbage man');
  })

  it('should have a children property that starts as an empty array', () => {
    let node = new Node('garbage pan');

    assert.deepEqual(node.children, {})
  })
  
  it('should have a last node property that is an object', () => {
    let node = new Node('garbage fan');

    assert.isObject(node.lastNode, 'is an object')
  })

  it('should have a default property of null for the completedWord property within the last node property', () => {
    let node = new Node('gary the berry');

    assert.equal(node.lastNode.completedWord, null)
  })

  it('should have a default property of 0 for the popularity property within the last node property', () => {
    let node = new Node('gary the berry');

    assert.equal(node.lastNode.popularity, 0)
  })
})