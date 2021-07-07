'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const temp = [...this];
    const startPoint = (start === undefined || start < -(temp.length)) ? 0
      : start < 0 ? this.length + start
        : start;
    const deleteWidth = (deleteCount === undefined) ? this.length - startPoint
      : deleteCount;
    const itemWidth = (items === undefined) ? 0 : items.length;
    const splice = [];

    if (arguments.length === 0 || start > temp.length || deleteCount < 0) {
      return [];
    }

    for (let i = 0; i < deleteWidth; i++) {
      splice[i] = temp[startPoint + i];
    }

    for (let j = 0; j < startPoint; j++) {
      this[j] = temp[j];
    }

    for (let m = 0; m < items.length; m++) {
      this[startPoint + m] = items[m];
    }

    for (let k = 0; k < temp.length - startPoint - deleteWidth; k++) {
      this[startPoint + k + itemWidth] = temp[startPoint + deleteCount + k];
    }

    this.length = (items === undefined) ? temp.length - deleteWidth
      : temp.length - deleteWidth + items.length;

    return splice;
  };
}

module.exports = applyCustomSplice;
