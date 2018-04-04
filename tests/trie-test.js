const chai = require('chai');
const assert = chai.assert;
const {Node} = require('../scripts/node');
const {Trie} = require('../scripts/trie');
import fs from 'fs';
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe( 'Trie', () => {

  let trie;
  beforeEach(() => {
    trie = new Trie()
  })

  it('should be a class', () => {
    assert.isFunction(Trie);
  })

  it('should have a default root node', () => {
    let node = new Node();
    assert.deepEqual(trie.root, node);
  })

  it('should track the total number of words', () => {
    assert.equal(trie.count, 0);
  })

  it('should have an array that will hold suggestions', () => {
    assert.deepEqual(trie.suggestionArray, [])
  })

  describe( 'Insert Method', () => {

    it('should create a node for each letter in word', () => {
      trie.insert('g');
      assert.isNotNull(trie.root.children.g)
      trie.insert('go');
      assert.isNotNull(trie.root.children.g.children.o)
    }) 

    it('should, at final letter in word, assign completedWord property to equal original word passed in', () => {
      trie.insert('car');
      assert.equal(trie.root.children.c.children.a.children.r.completedWord, 'car');
    })

    it('should not create additional nodes, after word has been completely inserted', () => {
      trie.insert('cat');
      assert.deepEqual(trie.root.children.c.children.a.children.t.children, {})
    })

    it('should increment word count as words are passed in', () => {
      trie.insert('garbage');
      assert.equal(trie.count, 1);
      trie.insert('trash');
      assert.equal(trie.count, 2);
    })

    it('should not increment count if word already exists in trie', () => {
      trie.insert('garbage');
      assert.equal(trie.count, 1);
      trie.insert('garbage');
      assert.equal(trie.count, 1);
    })
  })

  describe('Suggest Method', () => {
    
    beforeEach(() => {
      trie.insert('garbage')
      trie.insert('gametes')
      trie.insert('garden')
      trie.insert('gargantuan')
      trie.insert('gab')
      trie.insert('gamete')
      trie.insert('sushi')
    })

    it('should return an array of all possible outcomes based on incomplete user generated string', () => {
      trie.suggest('ga')
      assert.deepEqual(trie.suggestionArray, ['garbage', 'garden', 'gargantuan', 'gametes', 'gab', 'gamete'])
    })

    it.skip('should only return an array containing outcomes that exist as extensions of user string', () => {
      trie.suggest('gar');
      assert.include(trie.suggestionArray, 'garbage', 'garden', 'gargantuan')
    })

    it.skip('should return words that are further down trie, even if a complete word exists above it in the trie', () => {
      trie.suggest('game');
      // assert.include(trie.suggestionArray, 'gamete', 'gametes')
    })
  })
})