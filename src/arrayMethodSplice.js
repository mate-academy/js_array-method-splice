'use strict';

/**
 * Implement method Splice
 */
function applyCustomShift() {
  [].__proto__.shift2 = function() {
    const length = this.length;

    if (length === 0) {
      return undefined;
    }

    const shifted = this[0];

    for (let i = 0; i < length; i++) {
      this[i] = this[i + 1];
    }

    this.length = length - 1;

    return shifted;
  };
}

applyCustomShift();

function applyCustomPush() {
  [].__proto__.push2 = function(...elements) {
    let index = this.length;

    for (const element of elements) {
      this[index] = element;
      index++;
    }

    return this.length;
  };
}

applyCustomPush();

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const length = this.length;
    let modified = [];
    let startIndex = start;
    const deleteCountIndex = deleteCount;

    if (arguments.length === 0) {
      return modified;
    }

    if (startIndex === undefined) {
      startIndex = 0;
    }

    if (!deleteCountIndex && deleteCountIndex !== 0) {
      if (startIndex < 0) {
        if ((startIndex * -1) > length) {
          startIndex = 0;
        } else {
          startIndex = length + startIndex;
        }
      } else if (startIndex > length) {
        startIndex = length;
      }

      for (let i = startIndex; i < length; i++) {
        modified.push2(this[i]);
      }
      this.length = startIndex;

      return modified;
    }

    if (items.length === 0) {
      if (deleteCountIndex > length - startIndex) {
        return this.splice2(startIndex);
      } else if (deleteCountIndex < 1) {
        return modified;
      }

      const tail = this.splice2(startIndex);

      for (let i = 0; i < deleteCountIndex; i++) {
        modified.push2(tail.shift2());
      }

      while (tail.length !== 0) {
        this.push2(tail.shift2());
      }

      return modified;
    }

    const tailItems = this.splice2(startIndex + deleteCountIndex);

    modified = this.splice2(startIndex);

    for (let i = 0; i < items.length; i++) {
      this.push2(items[i]);
    }

    while (tailItems.length !== 0) {
      this.push2(tailItems.shift2());
    }

    return modified;
  };
}

module.exports = applyCustomSplice;
