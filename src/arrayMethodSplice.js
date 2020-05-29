'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length === 0
      || deleteCount < 0
      || (start >= this.length && start !== 0)) {
      return [];
    };

    const copyThis = [...this];
    if (start < -this.length) {
      this.length = 0;
      return copyThis;
    }

    let newStart = start;
    if (start < 0) {
      newStart += this.length;
    };

    const temp = newStart + deleteCount;
    const tempArr = [];
    if (temp) {
      for (let i = temp; i < this.length; i++) {
        tempArr[tempArr.length] = this[i];
      }
    };

    this.length = this.length - (this.length - newStart);

    for (let i = 0; i < items.length; i++) {
      this[this.length] = items[i];
    }

    for (let i = 0; i < tempArr.length; i++) {
      this[this.length] = tempArr[i];
    };

    const result = [];
    for (let i = 0; i < copyThis.length; i++) {
      if (!this.includes(copyThis[i])) {
        result[result.length] = copyThis[i];
      }
    }

    return result;
  };
}
module.exports = applyCustomSplice;
