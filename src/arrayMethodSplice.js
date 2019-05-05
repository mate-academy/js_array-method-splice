'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (typeof start === 'undefined') {
      return [];
    }
    if (start < 0) {
      start = this.length + start;
    }
    if (typeof deleteCount === 'undefined') {
      deleteCount = this.length - start;
    }
    // remove items
    if (items.length === 0) {
      let l0 = this.length;
      let arr = this.slice(start, start + deleteCount);
      for (let i = start + deleteCount; i < l0; i++) {
        this[i - deleteCount] = this[i];
      }
      for (let i = 0; i < deleteCount; i++) {
        this.pop();
      }
      return arr;
    }
    // update items
    let arr = this.slice(start, start + deleteCount);
    for (let i = 0; i < deleteCount; i++) {
      this[start + i] = items.shift();
    }
    // insert items
    let l0 = this.length;
    let l = items.length;
    if (l > 0) {
      for (let i = 0; i < l; i++) {
        this.push(items[i]);
      }
      for (let i = l0 - 1; i >= start + deleteCount; i--) {
        this[i + l] = this[i];
      }
      for (let i = 0; i < l; i++) {
        this[start + deleteCount + i] = items[i];
      }
    }
    return arr;
  };
}

module.exports = applyCustomSplice;
