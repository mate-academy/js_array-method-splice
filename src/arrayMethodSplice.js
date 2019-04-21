'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const objectLength = this.length;
    const argLength = items.length;
    let removedItems = [];
    let temp = [];

    if (start < 0) start += objectLength;
    if ((start * -1) > objectLength) {
      removedItems = [...this];
      this.length = 0;
      return removedItems;
    }
    if (start === 0) return this;

    if (deleteCount > objectLength) deleteCount = 0;
    if (deleteCount === 0 && (!items)) return removedItems;

    for (let i = objectLength; i > start; i--) {
      removedItems.push(this.pop());
    }

    if (deleteCount && argLength <= 0) {
      removeFromBuffer();
      putTogether(this);
    }
    if (argLength > 0) {
      removeFromBuffer();
      insertArgs(this);
      putTogether(this);
    }

    function removeFromBuffer() {
      temp = removedItems.slice();
      removedItems = [];
      for (let i = 0; i < deleteCount; i++) {
        removedItems.push(temp.pop());
      }
      removedItems.reverse();
    }

    function insertArgs(obj) {
      items.forEach(item => obj.push(item));
    }

    function putTogether(obj) {
      let tempLength = temp.length;
      for (let j = 0; j < tempLength; j++) {
        obj.push(temp.pop());
      }
    }
    return removedItems.reverse();
  };
}

module.exports = applyCustomSplice;
