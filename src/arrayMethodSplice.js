'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const initialLength = this.length;
    const argLength = items.length;
    let removedItems = [];
    let temp = [];

    if (start < 0) start += initialLength;
    if (start * -1 > initialLength) {
      removedItems = [...this];
      this.length = 0;
      return removedItems;
    }
    if (start === 0) return this;

    if (deleteCount > initialLength) deleteCount = 0;
    if (deleteCount === 0 && !items) return removedItems;

    for (let i = initialLength; i > start; i--) {
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
