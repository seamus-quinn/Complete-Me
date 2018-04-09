class Node {
  constructor(value = null) {
    this.value = value;
    this.children = {};
    this.lastNode = {
      completedWord: null,
      popularity: 0,
    }
  }
}

module.exports = {
  Node
}