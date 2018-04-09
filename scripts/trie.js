const {Node} = require('../scripts/node')

class Trie {
  constructor() {
    this.root = new Node()
    this.count = 0;
    this.sortedSuggestionArray = [];
  }

  insert(word, node = this.root, array = []) {
    word = word.toLowerCase();
    let newArray = array;
    if(node.children[word[0]] && word.length === 1) {
      let checkWord = node.children[word[0]].lastNode.completedWord;
      if(checkWord === null) {
        newArray.push(word[0])
        node.children[word[0]].lastNode.completedWord = newArray.join('');
        this.count++;
      }
    } else if(node.children[word[0]]){
      newArray.push(word[0]);
      this.insert(word.slice(1), node.children[word[0]], newArray)
    } else {
      node.children[word[0]] = new Node(word[0]);
      if (word.length === 1 && node.children[word[0]].lastNode.completedWord === null) {
        newArray.push(word[0])
        node.children[word[0]].lastNode.completedWord = newArray.join('');
        this.count++;
      } else {
        newArray.push(word[0])
        this.insert(word.slice(1), node.children[word[0]], newArray)
      }
    }
  }

  suggest(string) {
    this.suggestionArray = [];
    let splitString = [...string.toLowerCase()];
    let currentNode = this.root;

    for (let i = 0; i < splitString.length; i++) {
      if (currentNode === undefined) {
        return this.suggestionArray;
      }
      currentNode = currentNode.children[splitString[i]]
    }
    this.findWords(currentNode);

    this.suggestionArray.sort((a, b) => {
      return b.popularity - a.popularity
    })

    this.sortedSuggestionArray = this.suggestionArray.map(object => {
      return object.completedWord;
    })
    return this.sortedSuggestionArray;
  }

  findWords(node) {
    let nodeChildren = Object.keys(node.children);

    nodeChildren.forEach(child => {
      if (node.children[child].lastNode.completedWord) {
        this.suggestionArray.push(node.children[child].lastNode);
        this.findWords(node.children[child]);
      } else {
        this.findWords(node.children[child]);
      }
    })
  }

  select(string) {
    let splitString = [...string.toLowerCase()];
    let currentNode = this.root;

    for (let i = 0; i < splitString.length; i++) {
      currentNode = currentNode.children[splitString[i]]
    }
    currentNode.lastNode.popularity++;
  }

  populate(array) {
    array.forEach(word => {
      this.insert(word)
    })
  }
}

module.exports = {
  Trie
}