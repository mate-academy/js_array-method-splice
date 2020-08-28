'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0,
    deleteCount,
    ...items) {
    if (arguments.length === 0) {
      return [];
    }

    let go = start;
    let count = deleteCount;
    const newArr = [];
    const result = [];

    if (deleteCount < 0) {
      return result;
    }

    if (go < 0) {
      go = this.length + go;

      if (go < 0) {
        go = 0;
      }
    } else if (go > this.length) {
      return result;
    }

    if (count === undefined) {
      count = this.length - go;
    }

    if (go !== 0) {
      for (let i = 0; i < go; i++) {
        newArr.push(this[i]);
      }
    }

    if (items.length !== 0) {
      newArr.push(...items);
    }

    if (count !== this.length - go) {
      for (let i = go + count; i < this.length; i++) {
        newArr.push(this[i]);
      }
    }

    for (let i = go; i < go + count; i++) {
      result.push(this[i]);
    }

    this.length = 0;

    for (let i = 0; i < newArr.length; i++) {
      this.push(newArr[i]);
    }

    return result;
  };
}

module.exports = applyCustomSplice;
