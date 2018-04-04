class Node {
  constructor(value = null) {
    this.value = value;
    this.children = {};
    this.completedWord = null;
  }
}

module.exports = {
  Node
}