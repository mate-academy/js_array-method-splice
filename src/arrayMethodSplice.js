'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    };

    let indexStart = start;

    if (indexStart < 0) {
      indexStart = this.length - (-indexStart);
    } else if (indexStart > this.length) {
      indexStart = this.length;
    };

    if (indexStart < 0) {
      indexStart = 0;
    };

    let deleteAmount = deleteCount;

    if (deleteAmount === undefined
      || deleteAmount >= this.length - indexStart) {
      deleteAmount = this.length - indexStart;
    };

    if (deleteAmount < 0) {
      deleteAmount = 0;
    };

    const result = [];
    let newArray = [];

    for (let i = indexStart; i < indexStart + deleteAmount; i++) {
      result[result.length] = this[i];
    };

    for (let i = 0; i < indexStart; i++) {
      newArray[newArray.length] = this[i];
    };

    newArray = [...newArray, ...items];

    for (let i = indexStart + deleteAmount; i < this.length; i++) {
      newArray[newArray.length] = this[i];
    };

    for (let i = 0; i < newArray.length; i++) {
      this[i] = newArray[i];
    };

    this.length = newArray.length;

    return result;
  };
};

module.exports = applyCustomSplice;
