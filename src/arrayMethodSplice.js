'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.push2 = function(...forPushed) {
    for (let i = 0; i < forPushed.length; i++) {
      this[this.length] = forPushed[i];
    }

    return this;
  };

  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const args = [...arguments];
    const splisedEl = [];
    const elAfterSpliced = [];

    let startIndex = start;
    let toDelete = deleteCount;

    if (args.length === 0) {
      return splisedEl;
    }

    if (args.length === 1) {
      if (startIndex === undefined) {
        startIndex = 0;
      }

      if (startIndex < 0) {
        startIndex += this.length;
      }

      if (startIndex < 0) {
        startIndex = 0;
      }

      toDelete = this.length;

      if (startIndex > this.length) {
        toDelete = 0;
        startIndex = 0;
      }
    }

    if (args.length > 1) {
      if (startIndex === undefined && toDelete === undefined) {
        return splisedEl;
      }

      if (startIndex === undefined) {
        startIndex = 0;
      }

      if (startIndex < 0) {
        startIndex += this.length;
      }

      if (startIndex < 0) {
        startIndex = 0;
      }

      if (startIndex > this.length) {
        toDelete = 0;
        startIndex = 0;
      }

      if (toDelete === undefined) {
        toDelete = this.length;
      }

      if (toDelete < 0) {
        return splisedEl;
      }
    }

    for (let i = 0; i < this.length; i++) {
      if (i >= startIndex && i < startIndex + toDelete) {
        splisedEl.push(this[i]);
      } else if (i >= startIndex + toDelete) {
        elAfterSpliced.push(this[i]);
      }
    }

    this.length = startIndex;

    this.push2(...items, ...elAfterSpliced);

    return splisedEl;
  };
}

module.exports = applyCustomSplice;
