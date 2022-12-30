'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const removedElements = [];
    const remainedElements = [];
    let actualStart = start;
    let actualDelete = deleteCount;

    if (actualStart === undefined
    && actualDelete === undefined && items.length === 0) {
      return removedElements;
    }

    if (actualStart === undefined || actualStart < -this.length) {
      actualStart = 0;
    }

    if (actualStart < 0 && actualStart > -this.length) {
      actualStart = actualStart + this.length;
    }

    if (actualStart >= this.length) {
      actualStart = undefined;
    }

    if (actualDelete === undefined
      || (actualStart + actualDelete) >= this.length) {
      actualDelete = this.length;
    }

    if (actualDelete <= 0) {
      actualDelete = 0;
    }

    if (actualStart !== undefined || actualDelete !== undefined) {
      for (let i = 0; i < this.length; i++) {
        if (i >= actualStart && i <= actualStart + actualDelete - 1) {
          removedElements[removedElements.length] = this[i];
          delete this[i];
          continue;
        }
        remainedElements[remainedElements.length] = this[i];
      }
      this.length = 0;
    }

    if (items.length > 0 && remainedElements.length > 0) {
      for (let i = 0; i < remainedElements.length; i++) {
        if (i === actualStart) {
          for (let j = 0; j < items.length; j++) {
            this[this.length] = items[j];
          }
        }
        this[this.length] = remainedElements[i];
      }
    } else if (items.length === 0 && remainedElements.length > 0) {
      for (let i = 0; i < remainedElements.length; i++) {
        this[i] = remainedElements[i];
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
      }
    }

    return removedElements;
  };
}

module.exports = applyCustomSplice;
