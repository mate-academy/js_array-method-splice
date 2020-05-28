'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount = 0, ...items) {
    let newDeleteCounter = arguments[1];
    let reassignedStart = arguments[0];
    const removedList = [];

    if (start < 0) {
      reassignedStart = this.length + start;
    } else if (reassignedStart > this.length) {
      reassignedStart = this.length - 1;
    }

    if (reassignedStart * (-1) > this.length) {
      reassignedStart = 0;
    }

    if (deleteCount > this.length) {
      return [];
    } else if (deleteCount < 0) {
      newDeleteCounter = 0;
    }

    if (reassignedStart !== undefined
      && newDeleteCounter === undefined
      && items.length === 0) {
      newDeleteCounter = 1;
      reassignedStart = 0;
    }

    if (reassignedStart !== undefined
      && newDeleteCounter !== undefined
      && items.length === 0) {
      for (let i = reassignedStart; i < this.length; i++) {
        if (items.length === 0 && newDeleteCounter !== 0) {
          i++;
          removedList.push(this[i]);
        }
      }
      this.length = newDeleteCounter;
    }

    return removedList;
  };
}

module.exports = applyCustomSplice;
